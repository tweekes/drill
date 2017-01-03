import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    let catalog = [
      {
         id: 10,
         title: "Music Theory",
         playLists: [
           {id: 10, title: "Harmonic Intervals in C on Piano",
            items:[
              {title:"m2", whatMp3:"C-H-min2", ansMp3:"C-H-min2-ans" },
              {title:"M2", whatMp3:"C-H-maj2", ansMp3:"C-H-maj2-ans" },
              {title:"m3", whatMp3:"C-H-min3", ansMp3:"C-H-min3-ans" },
              {title:"M3", whatMp3:"C-H-maj3", ansMp3:"C-H-maj3-ans" },
              {title:"P4", whatMp3:"C-H-p4", ansMp3:"C-H-p4-ans" },
              {title:"P5", whatMp3:"C-H-p5", ansMp3:"C-H-p5-ans" }
             ]
           },
           {id: 11, title: "Harmonic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 12, title: "Melodic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }] },
           {id: 13, title: "Harmonic Intervals in C on Mandolin", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 14, title: "Harmonic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 15, title: "Melodic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }] },
           {id: 16, title: "Harmonic Intervals in C on Mandolin", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 17, title: "Harmonic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 18, title: "Melodic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }] },
           {id: 19, title: "Harmonic Intervals in C on Mandolin", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 20, title: "Harmonic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 21, title: "Melodic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }] },
           {id: 22, title: "Harmonic Intervals in C on Mandolin", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 23, title: "Harmonic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }]},
           {id: 24, title: "Melodic Intervals in C on Guitar", items:[{title:"?", whatMp3:"?", ansMp3:"?" }] }
         ]
      }
    ];
    return {catalog};
  }
}
