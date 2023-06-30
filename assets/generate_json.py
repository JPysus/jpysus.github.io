from os import listdir
from os.path import isfile, join
mypath = r'G:\Documents\GitHub\jpysus.github.io\assets\images\icons'
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

import json
onlyfiles = json.dumps(onlyfiles, indent=4)

jsonpath = r'G:\Documents\GitHub\jpysus.github.io\assets\json\generated_filenames.json'
with open(jsonpath, "w") as outfile:
    outfile.write('const data = '+str(onlyfiles))