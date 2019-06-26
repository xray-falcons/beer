
import urllib2
from bs4 import BeautifulSoup

url = 'https://www.folksbier.com/old-bavarian-lager'
page = urllib2.urlopen(url)
soup = BeautifulSoup(page, 'html.parser')

soup.prettify()

# print soup.find_all.h2.string




def get_all_beers(soup):
    beers = []
    all_h2 = soup.findAll('h2')
    for beer in all_h2:
        if beer.text:
            print beer.text
    #     if is_beer_entry(table_row):
    #         row_cells = table_row.findAll("td")
    #         beer_entry = {
    #             "id": get_beer_id(row_cells[0].text),
    #             "name": row_cells[1].text,
    #             "brewery_name": row_cells[2].text,
    #             "brewery_location": row_cells[3].text,
    #             "style": row_cells[4].text,
    #             "size": row_cells[5].text,
    #             "abv": row_cells[6].text,
    #             "ibu": row_cells[7].text
    #         }
    #         beers.append(beer_entry)
    # return beers
    # print all_h2

get_all_beers(soup)
