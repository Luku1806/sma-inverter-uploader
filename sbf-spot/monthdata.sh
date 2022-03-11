#!/bin/bash
#
log=/var/log/sbfspot.3/MyPlant_$(date '+%Y%m').log
/usr/local/bin/sbfspot.3/SBFspot -v -sp0 -ad0 -am1 -ae1 -finq -nocsv -cfg/usr/local/bin/sbfspot.3/SBFspot.cfg $1 $2 $3 $4 $5 &>>$log