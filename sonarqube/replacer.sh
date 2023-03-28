#!/bin/bash

if [ $# -ne 2 ];
then echo "Number of parameters is wrong.";
exit 1;
fi

TARGET_FILE=$1
ARGS_ENTRIES=$2
OLDIFS=$IFS
IFS=';'
read -a entries <<< "$ARGS_ENTRIES";
for entry in "${entries[@]}";
do
    IFS=","
read -a keyValue <<< "$entry";
    sed -i -e "s|__${keyValue[0]}__|${keyValue[1]}|g" "${TARGET_FILE}"
done
IFS=$OLDIFS