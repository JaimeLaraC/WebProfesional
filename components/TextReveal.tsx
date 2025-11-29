import React, { useEffect, useState, useRef } from 'react';

interface TextRevealProps {
    text: string;
    className?: string;
    as?: any;
    delay?: number; // Optional manual delay
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

const TextReveal: React.FC<TextRevealProps> = ({ text, className, as: Component = 'span' }) => {
    const [displayText, setDisplayText] = useState(text);
    const iterations = useRef(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        // Randomize start time slightly (0-100ms) to create a "wave" effect across the page
        // instead of everything animating perfectly in sync.
        const randomStart = Math.random() * 100;

        const startAnimation = () => {
            iterations.current = 0;
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = window.setInterval(() => {
                setDisplayText(prev =>
                    text
                        .split("")
                        .map((char, index) => {
                            // If it's a space, keep it a space (readability)
                            if (char === ' ') return ' ';

                            if (index < iterations.current) {
                                return text[index];
                            }
                            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                        })
                        .join("")
                );

                if (iterations.current >= text.length) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }

                // Speed: Faster for longer text to prevent UI lag
                iterations.current += text.length > 50 ? 2 : 1 / 2;
            }, 30);
        };

        const timeoutId = setTimeout(startAnimation, randomStart);

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    return <Component className={className}>{displayText}</Component>;
};

export default TextReveal;
