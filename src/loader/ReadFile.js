// *** Notes: can this just be a public class where we can pass in files to be read? 
export default class CsvRead {

    constructor (files) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            var csv = reader.result;
            var lines = csv.split("\n");
            var result = [];
            var headers=lines[0].split(","); 
            for(var i=1;i<lines.length;i++){
                var obj = {};
                var currentline=lines[i].split(",");
                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            //return result; //JavaScript object
            result = JSON.stringify(result); //JSON [{x, y, z}];
            console.log(result);
        }
        return reader.readAsText(files[0]); //array of files
    } 
}