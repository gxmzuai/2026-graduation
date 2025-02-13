import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface ImageCardProps {
  url: string
  title: string
  description: string
  date: string
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
  isPreviewOpen?: boolean
  onPreviewOpenChange?: (open: boolean) => void
}

export function ImageCard({ 
  url, 
  title, 
  description, 
  date,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  isPreviewOpen = false,
  onPreviewOpenChange
}: ImageCardProps) {
  const [imageError, setImageError] = useState(false);
  const [direction, setDirection] = useState(0);

  // 键盘导航
  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        setDirection(-1);
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        setDirection(1);
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen, hasPrevious, hasNext, onPrevious, onNext]);

  if (imageError) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
        图片加载失败
      </div>
    );
  }

  return (
    <Dialog open={isPreviewOpen} onOpenChange={onPreviewOpenChange}>
      <DialogTrigger asChild>
        <motion.div 
          className="group aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={url}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] p-0">
        <div className="relative h-full bg-black flex items-center justify-center">
          {/* 上一张按钮 */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={() => {
                setDirection(-1);
                onPrevious?.();
              }}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">上一张</span>
            </Button>
          )}

          {/* 图片 */}
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={url}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.2
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <motion.img
                src={url}
                alt={title}
                className="max-w-full max-h-[80vh] object-contain"
                layoutId={`image-${url}`}
                loading="lazy"
              />
            </motion.div>
          </AnimatePresence>

          {/* 下一张按钮 */}
          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
              onClick={() => {
                setDirection(1);
                onNext?.();
              }}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">下一张</span>
            </Button>
          )}

          {/* 图片信息 */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-black/60 text-white backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6">
              <DialogTitle className="text-xl mb-2">{title}</DialogTitle>
              <DialogDescription className="text-gray-200 text-base mb-2">
                {description}
              </DialogDescription>
              <div className="flex items-center text-gray-300 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <time>{date}</time>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
