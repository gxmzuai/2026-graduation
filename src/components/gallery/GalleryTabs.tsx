import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ImageCard } from "./ImageCard"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryYear {
  id: string
  images: {
    url: string
    title: string
    description: string
    date: string
  }[]
}

interface GalleryTabsProps {
  years: GalleryYear[]
}

const IMAGES_PER_PAGE = 20; // 5列 x 4行

export function GalleryTabs({ years }: GalleryTabsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [activeYear, setActiveYear] = useState('1');

  // 处理年份切换
  const handleYearChange = (year: string) => {
    setActiveYear(year);
    setCurrentPage(1);
    setPreviewIndex(null);
  };

  // 获取当前年份的图片
  const currentYearData = years.find(year => year.id === activeYear);
  // 计算总页数
  const totalPages = currentYearData ? Math.ceil(currentYearData.images.length / IMAGES_PER_PAGE) : 0;
  
  // 获取当前页的图片
  const currentImages = currentYearData?.images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  ) || [];

  // 处理预览导航
  const handlePrevious = () => {
    if (previewIndex === null || !currentYearData) return;
    const newIndex = previewIndex > 0 ? previewIndex - 1 : currentYearData.images.length - 1;
    setPreviewIndex(newIndex);
    // 如果图片在不同页，切换页面
    const newPage = Math.floor(newIndex / IMAGES_PER_PAGE) + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const handleNext = () => {
    if (previewIndex === null || !currentYearData) return;
    const newIndex = previewIndex < currentYearData.images.length - 1 ? previewIndex + 1 : 0;
    setPreviewIndex(newIndex);
    // 如果图片在不同页，切换页面
    const newPage = Math.floor(newIndex / IMAGES_PER_PAGE) + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full space-y-8">
      <Tabs value={activeYear} onValueChange={handleYearChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="1">研一</TabsTrigger>
          <TabsTrigger value="2">研二</TabsTrigger>
          <TabsTrigger value="3">研三</TabsTrigger>
        </TabsList>

        {['1', '2', '3'].map((yearId) => (
          <TabsContent key={yearId} value={yearId} className="space-y-8">
            {currentYearData && activeYear === yearId ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {currentImages.map((image, index) => {
                    const absoluteIndex = (currentPage - 1) * IMAGES_PER_PAGE + index;
                    return (
                      <ImageCard 
                        key={`${image.url}-${index}`} 
                        {...image}
                        isPreviewOpen={previewIndex === absoluteIndex}
                        onPreviewOpenChange={(open) => {
                          setPreviewIndex(open ? absoluteIndex : null);
                        }}
                        hasPrevious={currentYearData.images.length > 1}
                        hasNext={currentYearData.images.length > 1}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                      />
                    );
                  })}
                </div>
                
                {/* 分页控制 */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">第</span>
                      <span className="font-medium text-foreground">{currentPage}</span>
                      <span className="text-sm text-muted-foreground">页</span>
                      <span className="text-sm text-muted-foreground mx-1">/</span>
                      <span className="text-sm text-muted-foreground">共</span>
                      <span className="font-medium text-foreground">{totalPages}</span>
                      <span className="text-sm text-muted-foreground">页</span>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <p className="text-lg">照片即将到来...</p>
                <p className="text-sm mt-2">敬请期待</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
