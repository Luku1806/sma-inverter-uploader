sudo apt-get -y update
sudo apt-get -y upgrade

sudo apt-get install -y build-essential gcc g++ make libavahi-compat-libdnssd-dev


curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

mkdir /home/pi/sma_solar
cp -r . /home/pi/sma_solar
cd /home/pi/sma_solar

npm install

sudo cp sma_solar.service /etc/systemd/system/sma_solar.service
sudo systemctl enable sma_solar.service
sudo systemctl start sma_solar.service

sudo crontab -l > crondata
echo "*/3 * * * * /usr/bin/sh /home/pi/sma_solar/checkwifi.sh >> /dev/null 2>&1" >> crondata
sudo crontab crondata
rm crondata
