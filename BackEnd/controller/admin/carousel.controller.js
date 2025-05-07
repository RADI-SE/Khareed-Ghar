import { Carousel } from "../../model/carousel.model.js";

export const createCarousel = async (req, res) => {
    try {
        const { title, active, order } = req.body;
        const file = req.file; 
        if (!file) {
          return res.status(400).json({
            success: false,
            message: "No file uploaded.",
          });
        }
        const relativePath = file.path.replace(/\\/g, "/").split("uploads")[1];
        const imagePath = `/uploads/carousel/${relativePath}`;
        if (!imagePath || !title) {
            return res.status(400).json({ message: "Image and title are required" });
        }
        const carousel = await Carousel.create({ image: imagePath, title, active, order });
  res.status(201).json(carousel);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const updateCarousel = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
        const { title, active, order } = req.body;
        if (!file) {
            return res.status(400).json({ message: "Image is required" });
        }
        const relativePath = file.path.replace(/\\/g, "/").split("uploads")[1];
        const imagePath = `/uploads/carousel/${relativePath}`;
        const carousel = await Carousel.findByIdAndUpdate(id, { image: imagePath, title, active, order }, { new: true });
        res.status(200).json(carousel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCarousel = async (req, res) => {
    try {
        const { id } = req.params;
        const carousel = await Carousel.findByIdAndDelete(id);
        if (!carousel) {
            return res.status(404).json({ message: "Carousel not found" });
        }
      
        res.status(200).json({ message: "Carousel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCarousel = async (req, res) => {
    try {
        const carousel = await Carousel.find().sort({ order: 1 });
        res.status(200).json(carousel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


