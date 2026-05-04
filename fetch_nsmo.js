async function run() {
    try {
        const res = await fetch('https://www.nsmo.vn/dashboard/bcsx');
        const data = await res.text();
        console.log("Length of bcsx:", data.length);
        const scripts = data.match(/<script.*?>[\s\S]*?<\/script>/gi);
        let found = false;
        scripts.forEach(s => {
            if (s.includes('Highcharts') || s.includes('data:')) {
                console.log("Possible data script:", s.substring(0, 500));
                found = true;
            }
        });
        if (!found) console.log("No highcharts or data found in bcsx.");
    } catch(e) {
        console.error(e);
    }
}
run();
