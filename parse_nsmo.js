import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('nsmo.html', 'utf8');
const $ = cheerio.select ? cheerio : cheerio.load(html);
if (typeof $ === 'function') {
  // cheerio <= 1.0.0-rc.12
  console.log($('body').text().replace(/\s+/g, ' ').substring(0, 2000));
} else {
  // cheerio modern 
  console.log($.text($('body')).replace(/\s+/g, ' ').substring(0, 2000));
}
