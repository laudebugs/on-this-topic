from pathlib import Path
import json
import os
import simplejson


folderPath = "podcastData/"
files = os.listdir(folderPath)

podcasts = []
for filename in files:
    podFile = open(folderPath+filename,'r')
    data = podFile.read()
    podcast = json.loads(data)
    podcasts.append(podcast)

with open("podcasts.json",'w') as outputFile:
    outputFile.write(simplejson.dumps(podcasts, indent=4, sort_keys=True))