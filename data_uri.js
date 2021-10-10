/**
 * Copyright 2021 Bart Butenaers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
 module.exports = function(RED) {
    var settings = RED.settings;
    const DatauriParser = require('datauri/parser');

    function DataUriNode(config) {
        RED.nodes.createNode(this,config);
        this.inputField  = config.inputField;
        this.outputField = config.outputField;
        this.format      = config.format;

        var node = this;
        
        node.parser = new DatauriParser();

        node.on("input", function(msg) {
            var inputData;
            var result;
            
            try {
                inputData = RED.util.getMessageProperty(msg, node.inputField);
            } 
            catch(err) {
                node.error("The input data cannot be read from input msg." + node.inputField);
                return;
            }
            
            if (!inputData) {
                node.error("No data has been specified in input msg." + node.inputField);
                return; 
            }
            
            if (typeof inputData !== 'string' && !Buffer.isBuffer(inputData)) {
                node.error("The input data should be a string or a buffer");
                return;                
            }
            
            try {
                result = node.parser.format(node.format, inputData);
            }
            catch(err) {
                node.error("The data uri cannot be created: " + err);
                return;
            }
            
            try {
                RED.util.setMessageProperty(msg, node.outputField, result.content);
            } 
            catch(err) {
                node.error("The output msg." + node.outputField + " field can not be set");
                return;
            }
            
            node.send(msg);
        });

        node.on("close", function() {
            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("data-uri-generator", DataUriNode);
}
