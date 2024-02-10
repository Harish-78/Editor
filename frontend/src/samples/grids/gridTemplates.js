export const gridTemplates = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsth1nKmh8m-CwOAO5AUBxeWyzMe2h1YufvjfYhKRMhAC2I_YkgLuRVpMcfH-0cbPSczk&usqp=CAU",
    name: "Two-sided",
    defaultProps: {
      className: "layout",
      items: 2,
      rowHeight: 30,
      cols: 2,
      defaultGrids: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    },
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8E6FJCYyfb6ADOwMsfv_cqkgV_KJfl5JxXc13yiHYLXXt0U5K10tlXGjVabT2r5_FVKU&usqp=CAU",
    name: "Three sided",
    rotate: true,
  },

  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0sJknFXvdzHb9pW1X-WcineGiNXA6V9D9AcTiYjkyHsEiAD3F6dlgteP8Wc_aQsqe8c&usqp=CAU",
    name: "Custom",
  },
];
