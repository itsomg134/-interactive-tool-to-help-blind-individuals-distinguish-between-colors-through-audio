import React, { useState, useEffect } from 'react';
import { Volume2, Eye, Palette } from 'lucide-react';

const ColorAudioJudge = () => {
  const [color1, setColor1] = useState('#FF0000');
  const [color2, setColor2] = useState('#0000FF');
  const [analysis, setAnalysis] = useState(null);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const getColorName = (h, s, l) => {
    if (s < 10) {
      if (l < 20) return 'Black';
      if (l < 40) return 'Dark Gray';
      if (l < 60) return 'Gray';
      if (l < 80) return 'Light Gray';
      return 'White';
    }

    if (h < 15) return 'Red';
    if (h < 45) return 'Orange';
    if (h < 70) return 'Yellow';
    if (h < 150) return 'Green';
    if (h < 200) return 'Cyan';
    if (h < 260) return 'Blue';
    if (h < 330) return 'Purple';
    return 'Red';
  };

  const getBrightness = (l) => {
    if (l < 20) return 'very dark';
    if (l < 40) return 'dark';
    if (l < 60) return 'medium';
    if (l < 80) return 'light';
    return 'very light';
  };

  const getSaturation = (s) => {
    if (s < 20) return 'muted';
    if (s < 50) return 'somewhat saturated';
    if (s < 80) return 'saturated';
    return 'highly saturated';
  };

  const analyzeColors = () => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const hsl1 = rgbToHsl(rgb1.r, rgb1.g, rgb1.b);
    const hsl2 = rgbToHsl(rgb2.r, rgb2.g, rgb2.b);

    const name1 = getColorName(hsl1.h, hsl1.s, hsl1.l);
    const name2 = getColorName(hsl2.h, hsl2.s, hsl2.l);
    
    const brightness1 = getBrightness(hsl1.l);
    const brightness2 = getBrightness(hsl2.l);
    
    const sat1 = getSaturation(hsl1.s);
    const sat2 = getSaturation(hsl2.s);

    let hueDiff = Math.abs(hsl1.h - hsl2.h);
    if (hueDiff > 180) hueDiff = 360 - hueDiff;
    
    const lightDiff = Math.abs(hsl1.l - hsl2.l);
    const satDiff = Math.abs(hsl1.s - hsl2.s);

    const colorDiff = Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );

    let similarity = 'very different';
    if (colorDiff < 50) similarity = 'very similar';
    else if (colorDiff < 100) similarity = 'similar';
    else if (colorDiff < 200) similarity = 'somewhat different';

    setAnalysis({
      color1: { name: name1, brightness: brightness1, saturation: sat1, hsl: hsl1 },
      color2: { name: name2, brightness: brightness2, saturation: sat2, hsl: hsl2 },
      hueDiff,
      lightDiff,
      satDiff,
      similarity,
      colorDiff: Math.round(colorDiff)
    });
  };

  useEffect(() => {
    analyzeColors();
  }, [color1, color2]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakAnalysis = () => {
    if (!analysis) return;
    
    const text = `Color comparison: 
    First color is ${analysis.color1.brightness} ${analysis.color1.saturation} ${analysis.color1.name}. 
    Second color is ${analysis.color2.brightness} ${analysis.color2.saturation} ${analysis.color2.name}. 
    These colors are ${analysis.similarity}. 
    The hue difference is ${analysis.hueDiff} degrees. 
    The brightness difference is ${analysis.lightDiff} percent. 
    The saturation difference is ${analysis.satDiff} percent.`;
    
    speak(text);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Color Difference Judge</h1>
          </div>
          <p className="text-gray-400 text-lg">Audio-assisted color comparison for accessibility</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-xl mb-4 font-semibold">Color 1</label>
            <div 
              className="w-full h-40 rounded-lg mb-4 border-4 border-white"
              style={{ backgroundColor: color1 }}
              aria-label="Color 1 preview"
            />
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full h-16 cursor-pointer rounded"
              aria-label="Select first color"
            />
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="w-full mt-4 p-3 bg-gray-700 rounded text-center text-xl font-mono"
              aria-label="First color hex code"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <label className="block text-xl mb-4 font-semibold">Color 2</label>
            <div 
              className="w-full h-40 rounded-lg mb-4 border-4 border-white"
              style={{ backgroundColor: color2 }}
              aria-label="Color 2 preview"
            />
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full h-16 cursor-pointer rounded"
              aria-label="Select second color"
            />
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="w-full mt-4 p-3 bg-gray-700 rounded text-center text-xl font-mono"
              aria-label="Second color hex code"
            />
          </div>
        </div>

        <button
          onClick={speakAnalysis}
          className="w-full bg-blue-600 hover:bg-blue-700 p-6 rounded-lg mb-8 flex items-center justify-center gap-3 text-2xl font-bold transition"
          aria-label="Speak color analysis"
        >
          <Volume2 className="w-8 h-8" />
          Speak Analysis
        </button>

        {analysis && (
          <div className="bg-gray-800 p-8 rounded-lg space-y-6">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8" />
              Analysis Results
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Color 1</h3>
                <p className="text-lg mb-2"><strong>Name:</strong> {analysis.color1.name}</p>
                <p className="text-lg mb-2"><strong>Brightness:</strong> {analysis.color1.brightness}</p>
                <p className="text-lg mb-2"><strong>Saturation:</strong> {analysis.color1.saturation}</p>
                <p className="text-sm text-gray-400">HSL: {analysis.color1.hsl.h}°, {analysis.color1.hsl.s}%, {analysis.color1.hsl.l}%</p>
              </div>

              <div className="bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Color 2</h3>
                <p className="text-lg mb-2"><strong>Name:</strong> {analysis.color2.name}</p>
                <p className="text-lg mb-2"><strong>Brightness:</strong> {analysis.color2.brightness}</p>
                <p className="text-lg mb-2"><strong>Saturation:</strong> {analysis.color2.saturation}</p>
                <p className="text-sm text-gray-400">HSL: {analysis.color2.hsl.h}°, {analysis.color2.hsl.s}%, {analysis.color2.hsl.l}%</p>
              </div>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Comparison</h3>
              <p className="text-xl mb-3"><strong>Overall:</strong> These colors are <span className="text-blue-400">{analysis.similarity}</span></p>
              <p className="text-lg mb-2"><strong>Hue Difference:</strong> {analysis.hueDiff}° (color type difference)</p>
              <p className="text-lg mb-2"><strong>Brightness Difference:</strong> {analysis.lightDiff}%</p>
              <p className="text-lg mb-2"><strong>Saturation Difference:</strong> {analysis.satDiff}%</p>
              <p className="text-sm text-gray-400 mt-3">Color distance: {analysis.colorDiff}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorAudioJudge;