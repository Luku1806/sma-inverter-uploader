# SBFspot Config

The system is based on [SBFspot](https://github.com/SBFspot/SBFspot). It only uses the mqtt capabilities of SBFspot.

This document specifies the setup that is needed for the sma-inverter-uploader.

## Installation

### Install dependencies

```shell
sudo apt-get update
sudo apt-get -y --no-install-recommends install bluetooth libbluetooth-dev
sudo apt-get install -y libboost-date-time-dev libboost-system-dev libboost-filesystem-dev libboost-regex-dev
```

### Create needed directorys

```shell
cd ~
mkdir smadata
mkdir SBFspot
sudo mkdir /var/log/sbfspot.3
sudo chown -R $USER:$USER /var/log/sbfspot.3
```

### Install mosquitto

```shell
sudo apt-get -y install mosquitto mosquitto-clients
```

### Install SBFSpot

```shell
sbfspot_version=3.9.3
wget –c https://github.com/SBFspot/SBFspot/archive/V$sbfspot_version.tar.gz
tar -xvf V$sbfspot_version.tar.gz -C SBFspot --strip-components 1
cd ~/SBFspot/SBFspot
make nosql
```

### Configure SBFSpot

Backup old configuration

```shell
cd /usr/local/bin/sbfspot.3
sudo cp SBFspot.default.cfg SBFspot.cfg
```

and replace with [the given config](../sma-inverter-uploader/SBFSpot.cfg).

Lastly you have to create the mosqitto user and password and change them in the config of SBFspot.

```shell
sudo touch /etc/mosquitto/conf.d/010-access-list
sudo mosquitto_passwd /etc/mosquitto/conf.d/010-access-list sma-spot sma
sudo mosquitto_passwd /etc/mosquitto/conf.d/010-access-list sma-processor sma
sudo mosquitto_passwd -U passwordfile
```

### Test Installation

Subscribe to topic in one terminal

```shell
mosquitto_sub -d -h localhost -t inverter/# -u sma-processor -P sma
```

and run SBFspot in another.

```shell
/usr/local/bin/sbfspot.3/SBFspot -finq -v -mqtt
```