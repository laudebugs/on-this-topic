import csv
import json
import simplejson
# Initialize the podcast object
podcasts =[]
with open ("scripts/df_popular_podcasts.csv", mode='r') as file:
    csvFile=csv.reader(file)
    i=0;
    
    for line in csvFile:
        # initialize a new pod object
        pod = {
            "title":line[0],
            "publisher":"",
            "artwork":line[1],
            "feedURL":line[6],
            "description":line[8],
            "podcastURL":line[7]
        }
        podcasts.append(pod)

# output to json file
with open("podcastData/podcasts.json",'w') as outputFile:
    outputFile.write(simplejson.dumps(podcasts, indent=4, sort_keys=True))
    # json.dump(podcasts, outputFile)