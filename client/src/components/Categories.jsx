export default function Categories({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {categories.map((cat, id) => (
          <button
            key={id}
            onClick={() => setActiveCategory(cat.strCategory)}
            className={`flex flex-col items-center p-3 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105 ${
              activeCategory === cat.strCategory
                ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-xl"
                : "bg-white hover:shadow-lg"
            }`}
          >
            <div className="w-16 h-16 mb-2 rounded-full overflow-hidden flex items-center justify-center border border-gray-200">
              {cat.strCategoryThumb ? (
                <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold">{cat.strCategory[0]}</span>
              )}
            </div>
            <span className="text-sm font-semibold text-center">{cat.strCategory}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
