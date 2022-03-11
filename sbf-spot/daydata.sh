#!/bin/bash
#
log=/var/log/sbfspot.3/MyPlant_$(date '+%Y%m%d').log
/usr/local/bin/sbfspot.3/SBFspot -v -ad1 -am0 -ae1 -mqtt -nocsv -cfg/usr/local/bin/sbfspot.3/SBFspot.cfg $1 $2 $3 $4 $5 &>>$log
