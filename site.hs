--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import Hakyll
import System.FilePath

--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
    match "images/*" $ do
        route   idRoute
        compile copyFileCompiler

    match "brochures/*" $ do
        route   idRoute
        compile copyFileCompiler

    match "dist/**" $ do
        route   (customRoute $ joinPath . tail .splitPath . toFilePath)
        compile copyFileCompiler

    match "scss/**/*.css" $ do
        route   (customRoute $ joinPath . tail . splitPath . toFilePath)
        compile copyFileCompiler
        compile compressCssCompiler

    match "*.html" $ do
        route idRoute
        compile $ getResourceBody
                >>= loadAndApplyTemplate "templates/default.html" defaultContext
                >>= relativizeUrls

    match "templates/*" $ compile templateBodyCompiler
