/**
 *
 * structure for categoryList[] * required *:
 * [ string of Category name ]
 *
 * selectedCategories[] * optional *:
 * [ string of selected Category name ]
 *
 */
export function CategorySelector({
    categoryList = [],
    selectedCategories = [],
    isUsingAllButton = true,
    selectCategoryACB = null,
    removeCategoryACB = null,
    selectAllCategoryACB = null,
    isButtonDisabled = false,
}) {
    return (
        <div className="d-flex flex-wrap gap-2 mb-4">
            {isUsingAllButton && (
                <button
                    onClick={handleSelectAllCategory}
                    className={`btn btn-${selectedCategories.length < 1 ? "" : "outline-"}light rounded-pill px-4`}
                    disabled={isButtonDisabled}
                >
                    All
                </button>
            )}
            {categoryList.map(renderCategoryButtonCB)}
        </div>
    );

    function renderCategoryButtonCB(cat) {
        const catSelected = selectedCategories.find(findSelectedCategoryCB);
        return (
            <button
                className={`btn btn-${catSelected ? "" : "outline-"}light rounded-pill px-4`}
                key={`category-${cat}`}
                onClick={handleSelectCategory}
                disabled={isButtonDisabled}
            >
                {cat}
            </button>
        );

        function findSelectedCategoryCB(selectedCat) {
            return selectedCat === cat;
        }
        function handleSelectCategory(e) {
            e.preventDefault();
            if (!catSelected) {
                if (selectCategoryACB) selectCategoryACB(cat);
                return;
            }
            if (removeCategoryACB) removeCategoryACB(cat);
        }
    }

    function handleSelectAllCategory() {
        if (selectAllCategoryACB && selectedCategories.length > 0) {
            selectAllCategoryACB();
        }
    }
}
