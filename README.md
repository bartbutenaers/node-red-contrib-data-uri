# node-red-contrib-data-uri
A Node-RED node to generate a data URI containing specified data

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-data-uri
```

## Node usage

### Data URI basics
A Uniform Resource Identifier (URI) is a unique path to a web resource (web page, image, document, ...).  A client can use such a URI to get a resource from a web server:

![URI flow](https://user-images.githubusercontent.com/14224149/132959607-49a4293a-5ecb-4a8e-98b3-022632a67cb4.png)

However in some cases it is not possible to use an URI:
+ It is not desired to make the resource public available on the internet, because the content should not be accessible for everybody (for privacy reasons).
+ The resource should only be temporary available, until the client has fetched the resource.  
+ ...

In those cases a [data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) might be a solution.  A data URI contains the entire (base64 encoded) content of the resource:
```
data:<some media type>;base64,<base64 encoded resource data>
```
When such a data URI is passed to a client, the client will simply decode the base64 encoded data inside the URI (instead of accessing an external resource on a remote webserver).

### Example flow

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
