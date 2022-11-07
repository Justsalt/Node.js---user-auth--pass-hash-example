const categoriesPostSchema = require("../../schemas/Categories");
const ITEMS_PER_PAGE = 3;
module.exports = {
  FilterPosts: async (req, res) => {
    const { priceOne, priceTwo, searchingOrOffer, condition, categoryName } =
      req.body;
    console.log(categoryName);
    console.log(priceTwo);
    console.log(condition);
    console.log(searchingOrOffer);
    const filterMaxNumber = await categoriesPostSchema.find({
      price: { $gte: Number(priceOne), $lte: Number(priceTwo) },
      searchingOrOffer:
        searchingOrOffer === "all" ? ["searching", "offer"] : searchingOrOffer,
      condition: condition === "all" ? ["new", "used"] : condition,
      category:
        categoryName === "allCategories"
          ? [
              "transport",
              "realEsate",
              "job",
              "houseHold",
              "computer",
              "machinery",
            ]
          : categoryName,
    });

    const CategoryPostFilter = await categoriesPostSchema
      .find({
        price: { $gte: Number(priceOne), $lte: Number(priceTwo) },
        searchingOrOffer:
          searchingOrOffer === "all"
            ? ["searching", "offer"]
            : searchingOrOffer,
        condition: condition === "all" ? ["new", "used"] : condition,
        category:
          categoryName === "allCategories"
            ? [
                "transport",
                "realEsate",
                "job",
                "houseHold",
                "computer",
                "machinery",
              ]
            : categoryName,
      })
      .sort({ price: 1 });

    const countLength = filterMaxNumber.length;
    const pageCount = countLength / ITEMS_PER_PAGE;
    return res.status(200).send({
      pagination: {
        countLength,
        pageCount,
      },
      msg: "Atfiltruoti Postai",
      post: CategoryPostFilter,
    });
  },
  GetPostsByCategory: async (req, res) => {
    const { categoryName } = req.params;
    const query = {
      category:
        categoryName === "allCategories"
          ? [
              "transport",
              "realEsate",
              "job",
              "houseHold",
              "computer",
              "machinery",
            ]
          : categoryName,
    };
    const maxValue = await categoriesPostSchema
      .find(query)
      .sort({ price: 1 })
      .select("price");

    const page = req.query.page || 1;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const count = await categoriesPostSchema.find(query);
    countLength = count.length;
    const CategoryPost = await categoriesPostSchema
      .find(query)
      .sort({ price: 1 })
      .skip(skip)
      .limit(3);

    // .skip(page * booksPerPage).limit(booksPerPage)
    const pageCount = countLength / ITEMS_PER_PAGE;

    return res.status(200).send({
      pagination: {
        countLength,
        pageCount,
      },
      msg: "Rastas Postas Pagal Kategorija",
      post: CategoryPost,
      price: maxValue,
    });
  },
};
