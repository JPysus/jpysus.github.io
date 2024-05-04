from os import listdir, getcwd
from os.path import isfile, join
mypath = getcwd() + "\\images\\icons"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

import json
onlyfiles = json.dumps(onlyfiles, indent=4)

jsonpath = getcwd() +"\\json\\generated_filenames.json"
with open(jsonpath, "w") as outfile:
    outfile.write('const data = '+str(onlyfiles))