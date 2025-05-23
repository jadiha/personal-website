'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const GALLERY_IMAGES = [
  'amazon2.jpeg',
  'Ambassadors.jpeg',
  'boxing.jpg',
  'DSC00227.JPG',
  'DSC03005.jpg',
  'DSC05871.JPG',
  'HackTheNorth.jpg',
  'IMG_6300.jpg',
  'IMG-20240715-WA0005.jpg'
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-pink-500">Photo Gallery</h1>
          <Link 
            href="/" 
            className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-gray-700 flex items-center gap-2"
          >
            <span>←</span> Back to Terminal
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className="aspect-[4/3] group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`/gallery/${image}`}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <img
              src={`/gallery/${selectedImage}`}
              alt="Selected image"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-xl hover:text-pink-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 