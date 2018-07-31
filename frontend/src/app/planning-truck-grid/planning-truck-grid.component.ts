import {Component, ViewChild} from '@angular/core';
import {Release} from '../planning-release-grid/planning-release-grid.component';
import {MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'planningtruckgrid',
  templateUrl: './planning-truck-grid.component.html',
  styleUrls: ['../app.component.css']
})
export class PlanningTruckGrid
{
  displayedColumns = ['truckID', 'dayRound1', 'dayRound2', 'dayRound3', 'dayRound4', 'dayRound5', 'dayRound6', 'dayRound7', 'dayRound8'];
  dataSource = new MatTableDataSource(TRUCKS);
  day = true;
  dayOrNight = 'Switch to: Night';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit()
  {
    this.dataSource.paginator = this.paginator;
  }

  updateTable()
  {
    if (this.day)
    {
      this.dayOrNight = 'Switch to: Day';
    }
    else
    {
      this.dayOrNight = 'Switch to: Night';
    }

    this.day = !this.day;
  }
	  
}

 

export interface Slot
{
  supports40: boolean;
  release: Release;
}

export interface Rounds
{
  roundNumber: number;
  slots: Slot[];
}

export interface Truck
{
  id: string;
  dayRounds: Rounds[];
  nightRounds: Rounds[];
}

//this is the data from the server
const TRUCKS: Truck[] = [
  {
    id: 'truck1', dayRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testday1a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday1b', size: 1, qty: 1, colour: '#FF0000'}
            }, {
              supports40: false,
              release: {release: 'testday1c', size: 1, qty: 1, colour: '#0000FF'}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testday2a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday2b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday2c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testday3a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday3b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday3c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testday4a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday4b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday4c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testday5a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday5b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday5c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testday6a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday6b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday6c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday7a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday7b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday7c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday8a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday8b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday8c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        }
      ],
    nightRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testnight1a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight1b', size: 1, qty: 1, colour: '#0000FF'}
            }, {
              supports40: false,
              release: {release: 'testnight1c', size: 1, qty: 1, colour: '#FF0000'}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testnight2a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight2b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight2c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testnight3a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight3b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight3c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testnight4a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight4b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight4c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testnight5a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight5b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight5c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testnight6a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight6b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight6c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight7a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight7b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight7c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight8a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight8b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight8c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
      ]
  },
  {
    id: 'truck2', dayRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testday1a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday1b', size: 1, qty: 1, colour: '#0000FF'}
            }, {
              supports40: false,
              release: {release: 'testday1c', size: 1, qty: 1, colour: '#00FF00'}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testday2a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday2b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday2c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testday3a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday3b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday3c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testday4a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday4b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday4c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testday5a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday5b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday5c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testday6a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday6b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday6c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday7a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday7b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday7c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday8a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday8b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday8c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
      ],
    nightRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testnight1a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight1b', size: 1, qty: 1, colour: '#0000FF'}
            }, {
              supports40: false,
              release: {release: 'testnight1c', size: 1, qty: 1, colour: '#FF0000'}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testnight2a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight2b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight2c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testnight3a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight3b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight3c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testnight4a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight4b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight4c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testnight5a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight5b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight5c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testnight6a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight6b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight6c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight7a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight7b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight7c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight8a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight8b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight8c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        }
      ],
  },
  {
    id: 'truck3', dayRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testday1a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday1b', size: 1, qty: 1, colour: '#0000FF'}
            }, {
              supports40: false,
              release: {release: 'testday1c', size: 1, qty: 1, colour: '#FF0000'}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testday2a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday2b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday2c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testday3a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday3b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday3c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testday4a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday4b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday4c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testday5a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday5b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday5c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testday6a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday6b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday6c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday7a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testday7b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday7c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testday8a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testday8b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testday8c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
      ],
    nightRounds:
      [
        {
          roundNumber: 1, slots:
            [
              {supports40: true, release: {release: 'testnight1a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight1b', size: 1, qty: 1, colour: '#0000FF'}
            }, {
              supports40: false,
              release: {release: 'testnight1c', size: 1, qty: 1, colour: '#00FF00'}
            }
            ]
        },
        {
          roundNumber: 2, slots:
            [
              {supports40: true, release: {release: 'testnight2a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight2b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight2c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 3, slots:
            [
              {supports40: true, release: {release: 'testnight3a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight3b', size: 1, qty: 1, colour: '#FF0000'}
            }, {supports40: false, release: {release: 'testnight3c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 4, slots:
            [
              {supports40: true, release: {release: 'testnight4a', size: 1, qty: 1, colour: '#0000FF'}}, {
              supports40: true,
              release: {release: 'testnight4b', size: 1, qty: 1, colour: '#00FF00'}
            }, {supports40: false, release: {release: 'testnight4c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 5, slots:
            [
              {supports40: true, release: {release: 'testnight5a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight5b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight5c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        },
        {
          roundNumber: 6, slots:
            [
              {supports40: true, release: {release: 'testnight6a', size: 1, qty: 1, colour: '#FF0000'}}, {
              supports40: true,
              release: {release: 'testnight6b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight6c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        },
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight7a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight7b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight7c', size: 1, qty: 1, colour: '#FF0000'}}
            ]
        }
        ,
        {
          roundNumber: 7, slots:
            [
              {supports40: true, release: {release: 'testnight8a', size: 1, qty: 1, colour: '#00FF00'}}, {
              supports40: true,
              release: {release: 'testnight8b', size: 1, qty: 1, colour: '#0000FF'}
            }, {supports40: false, release: {release: 'testnight8c', size: 1, qty: 1, colour: '#00FF00'}}
            ]
        }
      ],
  }
];
