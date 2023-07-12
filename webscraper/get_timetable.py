import requests
from bs4 import BeautifulSoup, SoupStrainer
from urllib.parse import urljoin
import json
from tqdm import tqdm
from difflib import SequenceMatcher
import random


def get_train_links():
  base_URL = 'https://www.fernbahn.de/datenbank/suche/'

  URL = 'https://www.fernbahn.de/datenbank/suche/?fahrplan_jahr=9999&zug_bereich=&zug_gattung2%5B%5D=F&zug_gattung=&zug_linie=&fahrplan_jahr2=&fv_suche_zugverzeichnis=1#'
  page = requests.get(URL)

  soup = BeautifulSoup(page.content, "html.parser")

  link_tags = soup.find_all('a', string='ansehen', href=True)

  links = []

  for link_tag in link_tags:
    links.append(urljoin(base_URL, link_tag['href']))

  # Serializing json
  json_object = json.dumps(links, indent=4, ensure_ascii=False)

  # Writing to sample.json
  with open('train_links.json', 'w') as outfile:
    outfile.write(json_object)


def get_train_id(link):
  page = requests.get(link)

  id = "zls-daten-kopf"

  soup = BeautifulSoup(page.content, "html.parser")

  train_id = soup.find('span', {'id': id})

  train_id_formatted = " ".join(train_id.getText().split())

  return train_id_formatted


def get_stops(link):

  page = requests.get(link)

  table_class = 'sd-fahrplan-tabelle sd-fahrplan-tabelle-1'
  strainer = SoupStrainer('table', {'class': table_class})
  soup = BeautifulSoup(page.content, "html.parser", parse_only=strainer)

  # table = soup.find('table', {'class': table_class})

  table_data = soup.find_all('td')
  table_rows = soup.find_all('tr')

  stops = []

  for index in range(len(table_rows) - 1):
    add = index * 4

    stop = {
      'train_station': table_data[0 + add].getText(),
      'arrival': table_data[1 + add].getText(),
      'departure': table_data[2 + add].getText()
    }

    stops.append(stop)

  return stops


def get_timetable():
  with open('train_links.json', 'r') as file:
    train_links = json.load(file)

  timetable = []

  for link in tqdm(train_links):
    train_id = get_train_id(link)

    stops = get_stops(link)

    result = {"trainId": train_id, "stops": stops}

    timetable.append(result)

  json_object = json.dumps(timetable, indent=4,
                           ensure_ascii=False).encode('utf8')

  with open('timetable.json', 'w') as outfile:
    outfile.write(json_object.decode())


def get_timetable_stations():
  with open('timetable.json', 'r') as f:
    timetable = json.load(f)

  stations = []

  for connection in timetable:
    for stop in connection['stops']:
      stations.append(stop['train_station'])

  json_stations = json.dumps(stations, indent=4,
                             ensure_ascii=False).encode('utf8')

  with open('timetable_stations.json', 'w') as outfile:
    outfile.write(json_stations.decode())

  stations_set = set(stations)
  unique_stations = list(stations_set)

  unique_stations.sort()

  json_unique_stations = json.dumps(unique_stations,
                                    indent=4,
                                    ensure_ascii=False).encode('utf8')

  with open('timetable_unique_stations.json', 'w') as outfile:
    outfile.write(json_unique_stations.decode())


def get_station_names():
  with open('stations.json', 'r') as f:
    stations = json.load(f)

  station_names = []

  for station in stations:
    station_names.append(station['name'])

  json_station_names = json.dumps(station_names, indent=4,
                                  ensure_ascii=False).encode('utf8')

  with open('station_names.json', 'w') as outfile:
    outfile.write(json_station_names.decode())


def similar(a, b):
  return SequenceMatcher(None, a, b).ratio()


def get_station_similarity():
  with open('timetable_unique_stations.json', 'r') as f:
    timetable_stations = json.load(f)

  with open('station_names.json', 'r') as f:
    station_names = json.load(f)

  stations_similarity = []

  for timetable_station in tqdm(timetable_stations):
    highestMatch = {"station": None, "ratio": 0}
    for station_name in station_names:
      ratio = similar(timetable_station, station_name)
      if (ratio > highestMatch['ratio']):
        highestMatch = {"station": station_name, "ratio": ratio}

    stations_similarity.append({
      "timetable": timetable_station,
      "station": highestMatch['station'],
      "ratio": highestMatch['ratio'],
    })

  json_stations_similarity = json.dumps(stations_similarity,
                                        indent=4,
                                        ensure_ascii=False).encode('utf8')

  with open('stations_similarity.json', 'w') as outfile:
    outfile.write(json_stations_similarity.decode())


def clean_station_similarity():
  with open('stations_similarity.json', 'r') as f:
    station_similarities = json.load(f)

  with open('station_names.json', 'r') as f:
    station_names = json.load(f)

  cleaned_station_similarities = []

  for station_name in station_names:
    bestMatch = {"station": None, "ratio": 0}
    for station_similarity in station_similarities:
      if (station_similarity['station'] == station_name
          and station_similarity["ratio"] > bestMatch['ratio']):
        bestMatch = {
          "station": station_similarity["timetable"],
          "ratio": station_similarity["ratio"]
        }

    cleaned_station_similarities.append({
      'timetable': bestMatch['station'],
      'station': station_name,
      'ratio': bestMatch['ratio'],
    })

  json_stations_similarity = json.dumps(cleaned_station_similarities,
                                        indent=4,
                                        ensure_ascii=False).encode('utf8')

  with open('cleaned_stations_similarity.json', 'w') as outfile:
    outfile.write(json_stations_similarity.decode())


def get_best_matches():
  with open('cleaned_stations_similarity.json', 'r') as f:
    station_similarities = json.load(f)

  cleaned_station_similarities = []

  for station_similarity in station_similarities:
    if (station_similarity["ratio"] > 0.77):
      cleaned_station_similarities.append(station_similarity)

  json_stations_similarity = json.dumps(cleaned_station_similarities,
                                        indent=4,
                                        ensure_ascii=False).encode('utf8')

  with open('best_stations_similarity.json', 'w') as outfile:
    outfile.write(json_stations_similarity.decode())


def hmToSecondsOnly(hm, new_day=False):
  a = hm.split(":")

  if len(a) < 2:
    return 0

  print(a)
  print(a[0])
  print(a[1])

  temp = +int(a[0]) * 60 * 60 + +int(a[1]) * 60

  if new_day:
    return temp + 24 * 60 * 60
  else:
    return temp


def clean_timetable():
  with open('timetable.json', 'r') as f:
    timetable = json.load(f)

  with open('best_stations_similarity.json', 'r') as f:
    stations_similarity = json.load(f)

  with open('stations.json', 'r') as f:
    stations = json.load(f)

  cleaned_timetable = []

  for connection in tqdm(timetable):
    train_type = None

    splitted_train_id = connection['trainId'].split()

    for string in splitted_train_id:
      train_type = string

      if train_type.isalpha():
        break

    new_connection = {
      'trainType': train_type,
      'trainId': connection['trainId'],
      'stops': []
    }

    next_day = False
    prev_stop = None

    for stop in connection['stops']:
      match = [
        x for x in stations_similarity
        if x['timetable'] == stop['train_station']
      ]

      if (len(match) > 0):
        station_name = match[0]['station']
        station = [x for x in stations if x['name'] == station_name]

        if prev_stop != None and (hmToSecondsOnly(
            prev_stop['arrival']) > hmToSecondsOnly(prev_stop['departure'])
                                  or hmToSecondsOnly(prev_stop['departure']) >
                                  hmToSecondsOnly(stop['arrival'])):
          next_day = True

        arrival_time = hmToSecondsOnly(stop['arrival'], next_day)
        departure_time = hmToSecondsOnly(stop['departure'], next_day)

        new_connection['stops'].append({
          'stationName':
          station_name,
          'stationId':
          station[0]['number'],
          'track':
          str(random.randint(1, 22)),
          'arrivalTime':
          arrival_time if arrival_time else departure_time,
          'departureTime':
          departure_time if departure_time else arrival_time,
        })

        prev_stop = stop

    cleaned_timetable.append(new_connection)

  json_cleaned_timetable = json.dumps(cleaned_timetable,
                                      indent=4,
                                      ensure_ascii=False).encode('utf8')

  with open('cleaned_timetable.json', 'w') as outfile:
    outfile.write(json_cleaned_timetable.decode())


# script execution
# get_train_links()

# get_timetable()

# get_timetable_stations()

# get_station_names()

# get_station_similarity()

# clean_station_similarity()

# get_best_matches()

clean_timetable()
