
import React, { useRef, useState } from 'react';

interface ImagePickerProps {
  onImageSelected: (base64: string) => void;
  disabled?: boolean;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelected, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const triggerPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      
      <div 
        onClick={disabled ? undefined : triggerPicker}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          group relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed border-slate-700' : 
            isDragging 
              ? 'border-yellow-500 bg-yellow-500/10 scale-[1.02] glow-gold' 
              : 'border-slate-700 hover:border-yellow-500/50 hover:bg-slate-800/50'
          }
        `}
      >
        <div className="mb-4 flex justify-center">
          <div className={`
            w-20 h-20 rounded-full flex items-center justify-center transition-transform
            ${isDragging ? 'bg-yellow-500 scale-110' : 'bg-slate-800 group-hover:scale-110'}
          `}>
            <i className={`
              fas ${isDragging ? 'fa-upload' : 'fa-camera'} text-3xl 
              ${isDragging ? 'text-slate-900' : 'text-slate-400 group-hover:text-yellow-500'}
            `}></i>
          </div>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${isDragging ? 'text-yellow-500' : 'text-slate-200'}`}>
          {isDragging ? 'Drop Image Here' : 'Capture or Drop Artifact'}
        </h3>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          {isDragging 
            ? 'Release to begin analysis' 
            : 'Drag and drop an image, upload a file, or use your camera.'}
        </p>
        
        {!disabled && !isDragging && (
          <button className="mt-8 px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-slate-900 font-bold rounded-full shadow-lg transition-all active:scale-95">
            SELECT PHOTO
          </button>
        )}

        {/* Overlay pulse for drag state */}
        {isDragging && (
          <div className="absolute inset-0 rounded-2xl border-4 border-yellow-500/20 animate-pulse pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;
