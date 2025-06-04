'use client';

import { useEffect, useRef, useState } from 'react';
import { select, json, geoPath, geoNaturalEarth1 } from 'd3';
import { feature } from 'topojson';
import type { Topology, Objects } from 'topojson-specification';
import { motion } from 'framer-motion';

const SUPPORTED_COUNTRIES = {
    ar: 'Argentina',
    au: 'Australia', 
    at: 'Austria',
    be: 'Belgium',
    br: 'Brazil',
    bg: 'Bulgaria',
    ca: 'Canada',
    cn: 'China',
    co: 'Colombia',
    cu: 'Cuba',
    cz: 'Czech Republic',
    eg: 'Egypt',
    fr: 'France',
    de: 'Germany',
    gr: 'Greece',
    hk: 'Hong Kong',
    hu: 'Hungary',
    in: 'India',
    id: 'Indonesia',
    ie: 'Ireland',
    il: 'Israel',
    it: 'Italy',
    jp: 'Japan',
    lv: 'Latvia',
    lt: 'Lithuania',
    my: 'Malaysia',
    mx: 'Mexico',
    ma: 'Morocco',
    nl: 'Netherlands',
    nz: 'New Zealand',
    ng: 'Nigeria',
    no: 'Norway',
    ph: 'Philippines',
    pl: 'Poland',
    pt: 'Portugal',
    ro: 'Romania',
    ru: 'Russia',
    sa: 'Saudi Arabia',
    rs: 'Serbia',
    sg: 'Singapore',
    sk: 'Slovakia',
    si: 'Slovenia',
    za: 'South Africa',
    kr: 'South Korea',
    se: 'Sweden',
    ch: 'Switzerland',
    tw: 'Taiwan',
    th: 'Thailand',
    tr: 'Turkey',
    ae: 'UAE',
    ua: 'Ukraine',
    gb: 'United Kingdom',
    us: 'United States',
    ve: 'Venezuela'
};


const SUPPORTED_COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
    Object.entries(SUPPORTED_COUNTRIES).map(([code, name]) => [name.toLowerCase(), code])
);

export default function WorldMap() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    
    const width = 1400;
    const height = 800;

    const getCountryCode = (properties: any): string | null => {

        const name = properties.name?.toLowerCase() || properties.NAME?.toLowerCase() || properties.ADMIN?.toLowerCase();
        if (name && SUPPORTED_COUNTRY_NAMES[name]) {
            return SUPPORTED_COUNTRY_NAMES[name];
        }

        const altNames: Record<string, string> = {
            'united states of america': 'us',
            'usa': 'us',
            'united kingdom': 'gb',
            'great britain': 'gb',
            'south korea': 'kr',
            'republic of korea': 'kr',
            'czechia': 'cz',
            'czech republic': 'cz',
            'russian federation': 'ru',
            'u.a.e.': 'ae',
            'uae': 'ae',
        };
        if (name && altNames[name]) {
            return altNames[name];
        }
        return null;
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = select(svgRef.current);
        svg.selectAll("*").remove();
        
        const projection = geoNaturalEarth1()
            .scale(250)
            .translate([width / 2, height / 2])
            .center([0, 0]); 
        
        const pathGenerator = geoPath().projection(projection);

        json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
            .then(data => {
                const topology = data as Topology<Objects>;
                const countries = feature(topology, topology.objects.countries as any) as any;

                const supportedNames = Object.values(SUPPORTED_COUNTRIES).map(n => n.toLowerCase());
                const nameToCode: Record<string, string> = {};
                Object.entries(SUPPORTED_COUNTRIES).forEach(([code, name]) => {
                    nameToCode[name.toLowerCase()] = code;
                });

                svg.selectAll('.country')
                    .data(countries.features)
                    .enter().append('path')
                    .attr('class', 'country')
                    .attr('d', (d: any) => pathGenerator(d))
                    .attr('fill', (d: any) => {
                        const name = d.properties.name?.toLowerCase() || d.properties.NAME?.toLowerCase() || d.properties.ADMIN?.toLowerCase();
                        if (name && supportedNames.includes(name)) {
                            return '#4CAF50';
                        }
                        return '#e0e0e0';
                    })
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 0.5)
                    .style('cursor', (d: any) => {
                        const name = d.properties.name?.toLowerCase() || d.properties.NAME?.toLowerCase() || d.properties.ADMIN?.toLowerCase();
                        if (name && supportedNames.includes(name)) {
                            return 'pointer';
                        }
                        return 'default';
                    })
                    .on('click', (event: any, d: any) => {
                        const name = d.properties.name?.toLowerCase() || d.properties.NAME?.toLowerCase() || d.properties.ADMIN?.toLowerCase();
                        if (name && supportedNames.includes(name)) {
                            const code = nameToCode[name];
                            window.open(`http://localhost:3000/api/news-api?country=${code}`, '_blank');
                            setSelectedCountry(code);
                        }
                    })
                    .on('mouseover', function(event: any, d: any) {
                        const name = d.properties.name?.toLowerCase() || d.properties.NAME?.toLowerCase() || d.properties.ADMIN?.toLowerCase();
                        if (name && supportedNames.includes(name)) {
                            select(this).attr('fill', '#45a049');
                        }
                    })
                    .on('mouseout', function(event: any, d: any) {
                        const name = d.properties.name?.toLowerCase() || d.properties.NAME?.toLowerCase() || d.properties.ADMIN?.toLowerCase();
                        if (name && supportedNames.includes(name)) {
                            select(this).attr('fill', '#4CAF50');
                        }
                    });
            });
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                width: '100%',
                padding: '20px',
                boxSizing: 'border-box'
            }}
        >
            <svg 
                ref={svgRef} 
                viewBox={`0 0 ${width} ${height}`}
                style={{ 
                    width: '100%', 
                    maxWidth: '1400px', 
                    height: 'auto',
                    display: 'block'
                }}
            ></svg>
            <div style={{ marginTop: '20px', marginBottom: '10px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
                <p>Green countries are supported by NewsAPI • Gray countries are not supported</p>
            </div>
        </motion.div>
    );
}