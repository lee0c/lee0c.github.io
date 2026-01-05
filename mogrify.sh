#!/bin/bash

# check for mogrify
which mogrify > /dev/null
if [[ $? -ne 0 ]]
then
  echo "mogrify not found, run the following:"
  echo "sudo apt install imagemagick"
  exit 1
fi

# finds pattern [number]x[number]
REGEX="([0-9]+)x[0-9]+"
MAX_WIDTH=1200

for FILE in $(find assets/img)
do
  # skip directories
  if [ -d $FILE ]
  then
    continue
  fi

  # `identify` prints out file info incl. dimensions in pixels
  if [[ $(identify $FILE) =~ $REGEX ]]
  then
    # regex capture groups
    WIDTH=${BASH_REMATCH[1]}

    # resize if too large
    if (( $WIDTH > $MAX_WIDTH ))
    then
      echo "resizing $FILE with width $WIDTH"
      mogrify -resize 1200x $FILE
    fi
  fi
done
