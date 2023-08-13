## Description

This application retrieves YouTube channel RSS feed url from YouTube link.

## Requirements

Node.js - tested with `18.17.1 LTS` version, but should work with any version since this app doesn't use any external dependencies or advanced features.

## Usage

To retrieve YouTube channel RSS feed url run this command:  
`node app "https://www.youtube.com/@NoCopyrightSounds"`

To retrieve only channel id add `--id` parameter:  
`node app "https://www.youtube.com/@NoCopyrightSounds" --id`

**For better user experience:**  
Above commands gets the job done, but they require for you to be in application working directory. For better experience lets make it so you can run application globally (using Windows Terminal).

Create file at `C:\Users\<username>\Documents\PowerShell\profile.ps1` with this code:
```powershell
Function ytrss-fn { node D:\youtube-rss-url-retriever\app.js @args }
Set-Alias -Name ytrss -Value ytrss-fn
```
>`D:\youtube-rss-url-retriever\app.js` is location where you have downloaded this application.  
`ytrss` is name that I gave to this application and how I will be calling it from the terminal.

Now you can call this application from anywhere in Windows Terminal using this command:   
`ytrss "https://www.youtube.com/@NoCopyrightSounds"`