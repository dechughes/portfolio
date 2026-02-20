import React, { useState } from 'react';
import { Plus, ArrowUpRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

function ElectricLadyStudios() {
  const [selectedColor, setSelectedColor] = useState('black');
  const [{ rotateX, rotateY }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    config: { mass: 5, tension: 350, friction: 40 }
  }));

  const bind = useDrag(({ movement: [mx, my], down }) => {
    api.start({
      rotateX: down ? my / 5 : 0,
      rotateY: down ? mx / 5 : 0,
      immediate: down
    });
  });

  const tshirts = [
    {
      name: "Classic Logo Tee",
      price: 35.00,
      colors: [
        { name: 'Black', value: 'black' },
        { name: 'Navy', value: 'navy' },
        { name: 'Gray', value: 'gray' },
        { name: 'White', value: 'white' }
      ],
      images: {
        black: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        navy: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800",
        gray: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
        white: "https://images.unsplash.com/photo-1581655504656-ee72d87c5caf?w=800"
      },
      additionalImages: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400",
        "https://images.unsplash.com/photo-1581655504656-ee72d87c5caf?w=400"
      ]
    }
  ];

  const specs = [
    { title: 'Material', content: '100% Organic Cotton' },
    { title: 'Print Type', content: 'Screen Print' },
    { title: 'Fit', content: 'Regular Fit' },
    { title: 'Care', content: 'Machine Wash Cold' },
    { title: 'Origin', content: 'Made in USA' },
    { title: 'Sustainability', content: 'Eco-Friendly Materials' },
    { title: 'Sizing', content: 'True to Size' },
    { title: 'Shipping', content: 'Worldwide Delivery' }
  ];

  const currentProduct = tshirts[0];

  return (
    <div className="bg-[#f5f5dc] text-gray-900 min-h-screen">
      {/* Light Mode Toggle */}

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Main Product Image with 360 View */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="relative w-full max-w-2xl mx-auto perspective-1000">
              <animated.div
                {...bind()}
                style={{
                  rotateX,
                  rotateY,
                  transform: 'perspective(1000px)',
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <img
                  src={currentProduct.images[selectedColor]}
                  alt={`${currentProduct.name} in ${selectedColor}`}
                  className="w-full rounded-2xl shadow-lg"
                />
              </animated.div>
              <p className="text-center mt-4 text-sm text-gray-500">
                Click and drag to rotate
              </p>
            </div>

            {/* Color Selection */}
            <div className="mt-8">
              <h3 className="text-xl mb-4 text-center">Available Colors</h3>
              <div className="flex gap-4 justify-center">
                {currentProduct.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color.value
                        ? 'border-gray-900'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Images and Product Details */}
          <div className="lg:col-span-4">
            {/* Additional Images */}
            <div className="flex flex-row lg:flex-col gap-4 mb-8">
              {currentProduct.additionalImages.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>

            {/* Product Details */}
            <h1 className="text-5xl font-light mb-8">{currentProduct.name}</h1>
            <div className="flex items-center justify-between mb-12">
              <div className="text-3xl font-light">
                STARTING AT ${currentProduct.price}
              </div>
              <ArrowUpRight className="w-8 h-8" />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-16">
              <button className="px-8 py-3 border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors">
                SIZE GUIDE
              </button>
              <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Specs */}
        <div className="border-t border-gray-200">
          <h2 className="text-4xl font-light my-12">DETAILED SPECS</h2>
          <div className="grid gap-4">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="border-b border-gray-200 py-6 flex items-center"
              >
                <button className="flex items-center justify-between w-full text-left">
                  <span className="text-xl">{spec.title}</span>
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectricLadyStudios;