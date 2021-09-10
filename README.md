# node-red-contrib-data-uri
A Node-RED node to generate a data URI containing specified data

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-data-uri
```

## Node usage

The following example flow injects a string *"Hello Node-RED"* into this node::

![example flow](https://user-images.githubusercontent.com/14224149/132923612-73a47700-e028-4c53-a7a6-dd21ae2a532a.png)
```
[{"id":"e747f20b1b43678a","type":"data-uri-generator","z":"fa4e3e80.f097b","inputField":"payload","outputField":"payload","format":"text","name":"","x":560,"y":2800,"wires":[["e8e197a30af793c1"]]},{"id":"212e6dfaa8adcabd","type":"inject","z":"fa4e3e80.f097b","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello Node-RED","payloadType":"str","x":360,"y":2800,"wires":[["e747f20b1b43678a"]]},{"id":"e8e197a30af793c1","type":"debug","z":"fa4e3e80.f097b","name":"Data URI","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":740,"y":2800,"wires":[]}]
```
The output message will contain the data URI *"data:text/plain;base64,SGVsbG8gTm9kZS1SRUQ="*.  Our input text will be included into this url as a base64 encoded text.

It is very easy to check whether the data URI contains the input text, by pasting this generated data URI into the address bar of your browser.  The browser will show the input text into the page window:

![Browser test](https://user-images.githubusercontent.com/14224149/132923969-4512570f-f39b-494b-b92e-65948ebc42f1.png)


## Node properties

### Input field
The input message field that contains the data (as buffer or string), that needs to be included inside the data uri.

### Output field
The output message field where the generated data uri will be stored.  When the output message field is identical to the input message field, then the data in the input message field will be overwritten by the data URI.

### Format
The format of the input data, which needs to be specified as a simple ***file extension***.  For example the `png` format will result automatically in mime type `image/png`.  

The [mime DB](https://github.com/jshttp/mime-db/blob/master/db.json) offers a complete overview of all available file extensions.  The file extension is available in the "extensions" property.  For example the "txt" file extension will result in the "text/plain" mime type (= media type):
```
"text/plain": {
    "source": "iana",
    "compressible": true,
    "extensions": ["txt","text","conf","def","list","log","in","ini"]
}
```
But it is easier to work with file extensions (compared to mime types), because you use file extensions on a daily basis ...
