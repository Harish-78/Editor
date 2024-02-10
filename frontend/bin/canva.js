
import React from "react";
import { CanvaEditor, EditorConfig } from "canva-editor";
import { data } from "./sampleData";
import { useState } from "react";

const editorConfig = {
  logoUrl: "./your-logo.png",
  apis: {
    url: "http://localhost:4000/api",
    searchFonts: "/fonts",
    searchTemplates: "/templates",
    searchTexts: "/texts",
    searchImages: "/images",
    searchShapes: "/shapes",
    searchFrames: "/frames",
    templateKeywordSuggestion: "/template-suggestion",
    textKeywordSuggestion: "/text-suggestion",
    imageKeywordSuggestion: "/image-suggestion",
    shapeKeywordSuggestion: "/shape-suggestion",
    frameKeywordSuggestion: "/frame-suggestion",
  },
  placeholders: {
    searchTemplate: "Search templates",
    searchText: "Search texts",
    searchImage: "Search images",
    searchShape: "Search shapes",
    searchFrame: "Search frames",
  },
  editorAssetsUrl: "http://localhost:4000/editor",
  imageKeywordSuggestions: "animal,sport,love,scene,dog,cat,whale",
  templateKeywordSuggestions:
    "mother,sale,discount,fashion,model,deal,motivation,quote",
};

const TrailEditor = () => {
  const [saving, setSaving] = useState(false);
  const name = "";
  const handleOnChanges = (changes) => {
    console.log("On changes");
    console.log(changes);

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1e3);
  };

  const handleOnDesignNameChanges = (newName) => {
    console.log("On name changes");
    console.log(newName);

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1e3);
  };
  return React.createElement(CanvaEditor, {
    data: {
      name: name,
      editorConfig: data,
    },
    config: editorConfig,
    saving: saving,
    onChanges: handleOnChanges,
    onDesignNameChanges: handleOnDesignNameChanges,
  });
};

export default TrailEditor;
