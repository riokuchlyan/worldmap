'use client'

// internal

// external
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';

// built-in
import React, { useEffect, useRef, useState } from 'react';


const WordCloud: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); 

    interface WordFrequency {
        text: string;
        value: number;
    }

    const [wordData, setWordData] = useState<WordFrequency[]>([]);

    // Scroll-based animation setup
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Create transforms based on scroll progress
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 2]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    useEffect(() => {
        // Hardcoded test data for world news/global topics
        const testWordData: WordFrequency[] = [
            { text: "world", value: 45 },
            { text: "global", value: 38 },
            { text: "economy", value: 32 },
            { text: "climate", value: 28 },
            { text: "politics", value: 26 },
            { text: "technology", value: 24 },
            { text: "health", value: 22 },
            { text: "energy", value: 20 },
            { text: "trade", value: 18 },
            { text: "security", value: 16 },
            { text: "environment", value: 15 },
            { text: "development", value: 14 },
            { text: "international", value: 13 },
            { text: "conflict", value: 12 },
            { text: "democracy", value: 11 },
            { text: "migration", value: 10 },
            { text: "innovation", value: 9 },
            { text: "sustainability", value: 8 },
            { text: "cooperation", value: 7 },
            { text: "diplomacy", value: 6 }
        ];
        
        setWordData(testWordData);
    }, []);

    useEffect(() => {
        if (!wordData.length || !containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;

        if (svgRef.current) {
            d3.select(svgRef.current).selectAll('*').remove();
        }

        const layout = cloud()
            .size([containerWidth, containerHeight]) 
            .words(wordData.map(word => ({ text: word.text, size: word.value * 5 })))
            .padding(5)
            .rotate(() => (Math.random() > 0.5 ? 90 : 0))
            .font('Impact')
            .fontSize((d: any) => d.size)
            .on('end', draw);

        layout.start();

        function draw(layoutWords: any[]) {
            if (!svgRef.current) return;

            const svg = d3.select(svgRef.current)
                .attr('width', containerWidth) 
                .attr('height', containerHeight) 
                .append('g')
                .attr('transform', `translate(${containerWidth / 2}, ${containerHeight / 2})`);

            svg.selectAll('text')
                .data(layoutWords)
                .enter()
                .append('text')
                .style('font-family', 'Impact')
                .style('fill', (d, i) => d3.schemeCategory10[i % 10])
                .style('font-size', d => `${d.size}px`)
                .attr('text-anchor', 'middle')
                .attr('transform', d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
                .text(d => d.text);
        }
    }, [wordData]);

    return (
        <motion.div
            ref={containerRef} 
            style={{ 
                width: '100%', 
                height: '200vh', // Reduced height for better control
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden', // Prevent cutoff
            }}
        > 
            <motion.div
                style={{ 
                    scale,
                    opacity,
                    width: '100vw', // Full viewport width
                    height: '100vh', // Full viewport height
                }}
            >
                <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
            </motion.div>
        </motion.div>
    );
};

export default WordCloud;