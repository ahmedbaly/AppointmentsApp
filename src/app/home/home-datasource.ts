import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// TODO: Replace this with your own data model type
export interface HomeItem {
  id: number; 
  competition : string; 
  Round : string; 
  Datetime : string; 
  teamA : string;
  teamB : string;
  referee : string; 
  fassistant : string;
  sassistant : string; 
  Fourthofficial : string,
  faddassistant : string,
  saddassistant: string,
  refereeobs : string;
  obsReferee: string;
}



// TODO: replace this with real data from your application
const EXAMPLE_DATA: HomeItem[] = [];

/**
 * Data source for the Home view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HomeDataSource extends MatTableDataSource<HomeItem> {
  data: HomeItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  // connect(): Observable<HomeItem[]> {
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
  private getPagedData(data: HomeItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: HomeItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'ID': return compare(+a.id, +b.id, isAsc);
        case 'competition': return compare(+a.competition, +b.competition, isAsc);
        case 'Round': return compare(+a.Round, +b.Round, isAsc);
        case 'Datetime': return compare(+a.Datetime, +b.Datetime, isAsc);
        case 'EquipeA': return compare(+a.teamA, +b.teamA, isAsc);
        case 'EquipeB': return compare(+a.teamB, +b.teamB, isAsc);
        case 'Referee': return compare(+a.referee, +b.referee, isAsc);
        case 'Fassistant': return compare(+a.fassistant, +b.fassistant, isAsc);
        case 'sassistant': return compare(+a.sassistant, +b.sassistant, isAsc);
        case 'Fourthofficial': return compare(+a.Fourthofficial, +b.Fourthofficial, isAsc);
        case 'faddassistant': return compare(+a.faddassistant, +b.faddassistant, isAsc);
        case 'saddassistant': return compare(+a.saddassistant, +b.saddassistant, isAsc);
        case 'refereeobs': return compare(+a.refereeobs, +b.refereeobs, isAsc);
        case 'obsReferee': return compare(+a.obsReferee, +b.obsReferee, isAsc);

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
