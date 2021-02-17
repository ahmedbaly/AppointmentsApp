import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


// TODO: Replace this with your own data model type
export interface RefereesMatchItem {
    id: number; 
    competition : string; 
    round : string; 
    Datetime : string; 
    teamA : string;
    teamB : string;
    referee : string; 
    fassistant : string;
    sassistant : string; 
    refereeobs : string;
    faddassistant : string;
    saddassistant : string; 
}

// TODO: replace this with real data from your application
let EXAMPLE_DATA: RefereesMatchItem[] = [];


/**
 * Data source for the Referees view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RefereesMatchDataSource extends MatTableDataSource<RefereesMatchItem> {
  data: RefereesMatchItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }


  // }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  // connect(): Observable<RefereesItem[]> {
  //   // Combine everything that affects the rendered data into one update
  //   // stream for the data-table to consume.
  //   const dataMutations = [
  //     observableOf(this.data),
  //     this.paginator.page,
  //     this.sort.sortChange
  //   ];

  //   return merge(...dataMutations).pipe(map(() => {
  //     return this.getPagedData(this.getSortedData([...this.data]));
  //   }));
  // }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: RefereesMatchItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RefereesMatchItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'competition': return compare(+a.competition, +b.competition, isAsc);
        case 'round': return compare(+a.round, +b.round, isAsc);
        case 'Datetime': return compare(+a.Datetime, +b.Datetime, isAsc);
        case 'teamA': return compare(+a.teamA, +b.teamA, isAsc);
        case 'teamB': return compare(+a.teamB, +b.teamB, isAsc);
        case 'referee': return compare(+a.referee, +b.referee, isAsc);
        case 'fassistant': return compare(+a.fassistant, +b.fassistant, isAsc);
        case 'sassistant': return compare(+a.sassistant, +b.sassistant, isAsc);
        case 'faddassistant': return compare(+a.sassistant, +b.sassistant, isAsc);
        case 'saddassistant': return compare(+a.sassistant, +b.sassistant, isAsc);
        case 'refereeobs': return compare(+a.refereeobs, +b.refereeobs, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
