/*
  Module Purpose:
  Takes a file from ReadFile.js and does the work of converting the data points into a renderable format. 
  
  Doing all the work of scaling and converting datapoints into VR coordinates. 

  //// PARAMS ////
  fileForConversion format looks like this:

    [ {x:1,y:1,z:1},
      {x:2,y:2,z:2},
      {x:3,y:6,z:10} ]
    OR
    [ {price:1, time:1, hello:1, thirdColumn:10},
      {price:2, time:2, hello:2, thirdColumn: 10},
      {price:3, time:6, hello:10, thirdColumn: 11} ]

  xColName, yColName, zColName
    undefined defaults: takes the first 3 columns and sets them as x, y, z coor
    defined: sets corresponding x, y, z columns as the x,y,z variables
*/
 
export default class Converter {
  
  // add a parameter to determine size, color?? 
  constructor ( 
    fileForConversion,
    xColName,
    yColName,
    zColName,
    ) {
  
    // contains list of column names from the first object inside passed file
    let columnNames = Object.keys(fileForConversion[0]);

    if (columnNames === []) return Error("File empty");

    this.state = {
      fileForConversion,
      columnNames,
      xColName: !xColName ? columnNames[0] : xColName,
      yColName: !yColName ? columnNames[1] : yColName,
      zColName: !zColName ? columnNames[2] : zColName,
      vrXmin: -5,
      vrXmax: 5,
      vrYmin: -5, 
      vrYmax: 5,
      vrZmin: -10,
      vrZmax: -20
    }

  }

  // coorsToConvert [x, y, z] ???
  // names []
  // *** optimize: pretty sure d3 loops over the dataset each call.

  toVRCoor () {

    const { fileForConversion, xColName, yColName, zColName, vrXmin, vrYmin, vrZmin, vrXmax, vrYmax, vrZmax } = this.state;

    // console.log("fileForConversion : ", fileForConversion);
    // console.log("Column Name X **: ", fileForConversion[0][xColName]);


    // initialize our min / max
    let dXmin = fileForConversion[0][xColName]; 
    let dYmin = fileForConversion[0][yColName]; 
    let dZmin = fileForConversion[0][zColName]; 
    let dXmax = fileForConversion[0][xColName]; 
    let dYmax = fileForConversion[0][yColName]; 
    let dZmax = fileForConversion[0][zColName]; 

    fileForConversion.forEach( datapoint => {
      let x = datapoint[xColName];
      let y = datapoint[yColName];
      let z = datapoint[zColName];
      
      if (dXmin > x) dXmin = x;
      if (dYmin > y) dYmin = y;
      if (dZmin > z) dZmin = z;

      if (dXmax < x) dXmax = x;
      if (dYmax < y) dYmax = y;
      if (dZmax < z) dZmax = z;

    });

    // console.log("X MIN MAX : ", dXmin , dXmax);
    // ** CONVERTING ** //
    
    let datapoints = [];
    fileForConversion.forEach( datapoint => {
      // console.log("curDataPoint : ", datapoint);
      // property 'orig' holds all datapoing original data
      let newDataPoint = {
        orig: Object.assign({}, datapoint),

        vrX: (vrXmax - vrXmin) * ( (datapoint[xColName] - dXmin) / (dXmax - dXmin) ) + vrXmin ,
        
        vrY: (vrYmax - vrYmin) * ( (datapoint[yColName] - dYmin) / (dYmax - dYmin) ) + vrYmin ,
        
        vrZ: (vrZmax - vrZmin) * ( (datapoint[zColName] - dZmin) / (dZmax - dZmin) ) + vrZmin ,

      }
      // console.log("curDataPoint : ", newDataPoint);
      // console.log("curDataPoint.orig : ", newDataPoint.orig);

      datapoints.push(newDataPoint);
    })

    return datapoints;
  }

  getColumnNames () {
    return this.state.columnNames;
  }

  getVRAxisLineCoordinates () {
    let { vrXmin, vrYmin, vrZmin, vrXmax, vrYmax, vrZmax, xColName, yColName, zColName } = this.state;

    const xCenter = (vrXmax - vrXmin) / 2 + vrXmin;
    const yCenter = (vrYmax - vrYmin) / 2 + vrYmin;
    const zCenter= (vrZmax - vrZmin) / 2 + vrZmin;

    // TODO AXIS NAME PLACEMENT
    //      xName: xColName,
    //      yName: yColName, 
    //      zName: zColName
    return [
      { vrX: xCenter, vrY: yCenter, vrZ: zCenter,
        width: vrXmax - vrXmin, // x axis
        height: 0.2,
        depth: 0.2
      },
      { vrX: xCenter, vrY: yCenter, vrZ: zCenter,
        width: 0.2, 
        height: vrYmax - vrYmin, // y axis
        depth: 0.2,
      },
      { vrX: xCenter, vrY: yCenter, vrZ: zCenter,
        width: 0.2,
        height: 0.2, 
        depth: vrZmax - vrZmin, // z axis
      }
    ];
  }

  getVRBoxAxisCoordinates () {
    //TODO
  }

}

// const data =     
//   [ {x:1,y:6,z:0},
//     {x:2,y:2,z:5},
//     {x:3,y:-100,z:10} ];

// let converter = new Converter(data);

// console.log("toVRCoor : ", converter.toVRCoor());




// public handle scaling axis

// handle giving us datapoints that are scaled

// rerenders 


// [{vrX, vrY, vrZ, vrSize, vrColor, text: "price:1, time:1, hello:1, thirdColumn:10"}, {vrX, vrY, vrZ}]


// [{price:1, time:1, hello:1, thirdColumn:10},
// {price:2, time:2, hello:2, thirdColumn: 10},
// {price:3, time:6, hello:10, thirdColumn: 11}]

// price x, ... 

// [
//   {
//     vrX: -1,
//     vrY, 
//     vrZ, 
//     orig: {    
//       colum1:1, 
//       column2:1, 
//       colum3:1, 
//       colum4:10,
//     },
//   },
//   {price:2, time:2, hello:2, thirdColumn: 10},
//   {price:3, time:6, hello:10, thirdColumn: 11}]


// INSIDESTORE: 


//   modelsRendered: [
//     {
//     modelName: 
//     datapoints:
//             [{vrX: -1,
//             vrY, 
//             vrZ, 
//             orig: {    
//               colum1:1, 
//               column2:1, 
//               colum3:1, 
//               colum4:10,
//             },}]
//     PlaneCoordinates: 
//     styling: 
//     }, 
//     {...},

//   ]


//   [ modelBeingRendered []