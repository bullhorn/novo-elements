// NG2
import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// APP
let SearchDemoTpl = require('./templates/SearchDemo.html');

const template = `
<div class="container">
    <h1>Searches & Toggles <small><a target="_blank" href="https://github.com/bullhorn/novo-elements/blob/master/src/elements/switch">(source)</a></small></h1>
    <p>Loading animations are used to help indicate to the user that some sort of progress is taking place. These are especially helpful for intensive operations that might take extra time.</p>

    <h2>Types</h2>

    <h5>Tiles</h5>
    <p>Similar to radio buttons, tiles are used to select a single item. Tiles have a higher visibility than radio buttons, and are used more frequently in data visualizations. Tiles stretch horizontally, so the list they pull from must be small.</p>

    <h5>Searches</h5>
    <p>Searches are a binary toggle that allow the user to select one of two options. They are most frequently used for an on-off model.</p>
    <div class="example switch-demo">${SearchDemoTpl}</div>
    <code-snippet [code]="SearchDemoTpl"></code-snippet>
</div>
`;

@Component({
    selector: 'search-demo',
    template: template
})
export class SearchDemoComponent {
    private SearchDemoTpl:string = SearchDemoTpl;
    private toggleCount:number = 0;
    private checked:boolean = true;
    public test: string = 'TEST';
    public searchResults: Subject<any[]> = new Subject();

    public search(term: string): void {
        console.log('term', term);
        this.searchResults.next([
            { type: 'Candidate', name: 'George Washington'},
            { type: 'Candidate', name: 'James Madison'},
            { type: 'Candidate', name: 'Thomas Jefferson'},
            { type: 'Candidate', name: 'John Adams'}
        ]);
    }

    public onSelect(item) {
        this.test = item;
    }
}


// "George Washington" 1732–1799

// [10][11][12]"	"Unaffiliated
// [9]"	"(1788–89)
// 1
// (1789)"
// 		"(1792)
// 2
// (1793)"
// "John Adams
// 1735–1826
// (Lived: 90 years)
// [13][14][15]"	Federalist	"(1796)
// 3
// (1797)"
// "Thomas Jefferson
// 1743–1826
// (Lived: 83 years)
// [16][17][18]"	Democratic- Republican	"(1800)
// 4
// (1801)"
// 		"(1804)
// 5
// (1805)"
// "James Madison
// 1751–1836
// (Lived: 85 years)
// [19][20][21]"	Democratic- Republican	"(1808)
// 6
// (1809)"
		
// 		"(1812)
// 7
// (1813)"
		
// "James Monroe
// 1758–1831
// (Lived: 73 years)
// [22][23][24]"	Democratic- Republican	"(1816)
// 8
// (1817)"
// 		"(1820)
// 9
// (1821)"
// "John Quincy Adams
// 1767–1848
// (Lived: 80 years)
// [25][26][27]"	Democratic- Republican	"(1824)
// 10
// (1825)"
// "Andrew Jackson
// 1767–1845
// (Lived: 78 years)
// [28][29][30]"	Democratic	"(1828)
// 11
// (1829)"
		
// 		"(1832)
// 12
// (1833)"
// "Martin Van Buren
// 1782–1862
// (Lived: 79 years)
// [31][32][33]"	Democratic	"(1836)
// 13
// (1837)"
// "William Henry Harrison
// 1773–1841
// (Lived: 68 years)
// [34][35][36]"	Whig	"(1840)
// 14
// (1841) (1841)
// [j]"
// "John Tyler
// 1790–1862
// (Lived: 71 years)
// [37][38][39]"	"Whig
// April 4, 1841 –September 13, 1841"	
// 	"Unaffiliated
// September 13, 1841 –March 4, 1845
// [l]"	
// "James K. Polk
// 1795–1849
// (Lived: 53 years)
// [40][41][42]"	Democratic	"(1844)
// 15
// (1845)"
// "Zachary Taylor
// 1784–1850
// (Lived: 65 years)
// [43][44][45]"	Whig	"(1848)
// 16
// (1849) (1850)
// [j]"
// "Millard Fillmore
// 1800–1874
// (Lived: 74 years)
// [46][47][48]"	Whig	
// "Franklin Pierce
// 1804–1869
// (Lived: 64 years)
// [49][50][51]"	Democratic	"(1852)
// 17
// (1853)"
		
// "James Buchanan
// 1791–1868
// (Lived: 77 years)
// [52][53][54]"	Democratic	"(1856)
// 18
// (1857)"
// "Abraham Lincoln
// 1809–1865
// (Lived: 56 years)
// [55][56][57]"	"Republican
// (National Union)
// [n]"	"(1860)
// 19
// (1861)"
// 		"(1864)
// 20
// (1865) (1865)
// [j]"
// "Andrew Johnson
// 1808–1875
// (Lived: 66 years)
// [58][59][60]"	"National Union
// April 15, 1865 – c. 1868"	
// 	"Democratic
// c. 1868 – March 4, 1869
// [o]"	
// "Ulysses S. Grant
// 1822–1885
// (Lived: 63 years)
// [61][62][63]"	Republican	"(1868)
// 21
// (1869)"
// 		"(1872)
// 22
// (1873)"
		
// "Rutherford B. Hayes
// 1822–1893
// (Lived: 70 years)
// [64][65][66]"	Republican	"(1876)
// 23
// (1877)"
// "James A. Garfield
// 1831–1881
// (Lived: 49 years)
// [67][68][69]"	Republican	"(1880)
// 24
// (1881) (1881)
// [j]"
// "Chester A. Arthur
// 1829–1886
// (Lived: 57 years)
// [70][71][72]"	Republican	
// "Grover Cleveland
// 1837–1908
// (Lived: 71 years)
// [73][74]"	Democratic	"(1884)
// 25
// (1885)"
		
// "Benjamin Harrison
// 1833–1901
// (Lived: 67 years)
// [75][76][77]"	Republican	"(1888)
// 26
// (1889)"
// "Grover Cleveland
// 1837–1908
// (Lived: 71 years)
// [73][74]"	Democratic	"(1892)
// 27
// (1893)"
// "William McKinley
// 1843–1901
// (Lived: 58 years)
// [78][79][80]"	Republican	"(1896)
// 28
// (1897)"
		
// 		"(1900)
// 29
// (1901) (1901)
// [j]"
// "Theodore Roosevelt
// 1858–1919
// (Lived: 60 years)
// [81][82][83]"	Republican	
// 		"(1904)
// 30
// (1905)"
// "William Howard Taft
// 1857–1930
// (Lived: 72 years)
// [84][85][86]"	Republican	"(1908)
// 31
// (1909)"
		
// "Woodrow Wilson
// 1856–1924
// (Lived: 67 years)
// [87][88][89]"	Democratic	"(1912)
// 32
// (1913)"
// 		"(1916)
// 33
// (1917)"
// "Warren G. Harding
// 1865–1923
// (Lived: 57 years)
// [90][91][92]"	Republican	"(1920)
// 34
// (1921) (1923)
// [j]"
// "Calvin Coolidge
// 1872–1933
// (Lived: 60 years)
// [93][94][95]"	Republican	
// 		"(1924)
// 35
// (1925)"
// "Herbert Hoover
// 1874–1964
// (Lived: 90 years)
// [96][97][98]"	Republican	"(1928)
// 36
// (1929)"
// "Franklin D. Roosevelt
// 1882–1945
// (Lived: 63 years)
// [99][100][101]"	Democratic	"(1932)
// 37
// (1933)"
// 		"(1936)
// 38
// (1937)"
// 		"(1940)
// 39
// (1941)"
// 		"(1944)
// 40
// (1945) (1945)
// [j]"
// "Harry S. Truman
// 1884–1972
// (Lived: 88 years)
// [102][103][104]"	Democratic	
// 		"(1948)
// 41
// (1949)"
// "Dwight D. Eisenhower
// 1890–1969
// (Lived: 78 years)
// [105][106][107]"	Republican	"(1952)
// 42
// (1953)"
// 		"(1956)
// 43
// (1957)"
// "John F. Kennedy
// 1917–1963
// (Lived: 46 years)
// [108][109][110]"	Democratic	"(1960)
// 44
// (1961) (1963)
// [j]"
// "Lyndon B. Johnson
// 1908–1973
// (Lived: 64 years)
// [111][112]"	Democratic	
// 		"(1964)
// 45
// (1965)"
// "Richard Nixon
// 1913–1994
// (Lived: 81 years)
// [113][114][115]"	Republican	"(1968)
// 46
// (1969)"
// 		"(1972)
// 47
// (1973) (1974)
// [j]"
		
		
// "Gerald Ford
// 1913–2006
// (Lived: 93 years)
// [116][117][118]"	Republican	
		
// "Jimmy Carter
// Born 1924
// (92 years old)
// [119][120][121]"	Democratic	"(1976)
// 48
// (1977)"
// "Ronald Reagan
// 1911–2004
// (Lived: 93 years)
// [122][123][124]"	Republican	"(1980)
// 49
// (1981)"
// 		"(1984)
// 50
// (1985)"
// "George H. W. Bush
// Born 1924
// (93 years old)
// [125][126][127]"	Republican	"(1988)
// 51
// (1989)"
// "Bill Clinton
// Born 1946
// (71 years old)
// [128][129][130]"	Democratic	"(1992)
// 52
// (1993)"
// 		"(1996)
// 53
// (1997)"
// "George W. Bush
// Born 1946
// (71 years old)
// [131][132]"	Republican	"(2000)
// 54
// (2001)"
// 		"(2004)
// 55
// (2005)"
// "Barack Obama
// Born 1961
// (56 years old)
// [133][134]"	Democratic	"(2008)
// 56
// (2009)"
		