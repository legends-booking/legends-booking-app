#!/bin/bash
# Creates an NPM config that points to Workday Artifactory instead of npmjs.org,
# doing nothing if ~/.npmrc already exists (so just delete it to recreate it).
# Uses ~/.netrc to store your credentials. Will create a new entry if one for artifactory doesn't exist.
#
# To get your Artifactory API key, log in at https://artifactory.workday.com,
# click your name to load your user profile, and enter your password again.
npmrc=~/.npmrc
netrc=~/.netrc
artifactoryUrl=//artifactory.workday.com/artifactory/api/npm/

function createNPMRCFile() {
    curlOutput=$(curl -sS -n --fail https:${artifactoryUrl}auth)
    if [[ $? != 0 ]]; then
        echo "There was an error connecting to Artifactory, please check your API key in ${netrc}"
        exit 1
    fi

    echo "Generating ${npmrc}"

    authString="${artifactoryUrl}:_auth"

    data="registry = https:${artifactoryUrl}npm-virtual"$'\n'
    data+="${curlOutput/_auth/$authString}"$'\n'
    data+='engine-strict = true'$'\n'
    data+='loglevel = warn'

    echo "$data" > "$npmrc"
}

function addArtifactoryToNETRC() {
    ad_username=$(id -un)
    echo -n "Please enter your Artifactory API key, from artifactory.workday.com: "
    read -s api_key
    echo """
machine artifactory.workday.com
login $ad_username
password $api_key""" >> "$netrc"
}

if [[ -e "$npmrc" ]]; then
    echo "$npmrc already exists, leaving it as-is"
else
    if [[ -e "$netrc" ]]; then
        if grep -q 'artifactory.workday.com' ~/.netrc; then
            # netrc exists and we can connect
            createNPMRCFile
        else
            # netrc exists and we need to add an entry for artifactory
            addArtifactoryToNETRC
            createNPMRCFile
        fi
    else
        # netrc does not exist
        touch $netrc
        addArtifactoryToNETRC
        createNPMRCFile
    fi
fi