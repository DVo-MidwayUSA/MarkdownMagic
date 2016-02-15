using Microsoft.AspNet.SignalR;
using System.IO;

namespace MarkdownMagic.App.Hubs
{
    public class MainHub : Hub
    {
        private const string RootDirectory = @"C:\Users\Daniel\Documents\GitHub\MarkdownMagic\MarkdownMagic\MarkdownMagic.Markdown";

        public void Init()
        {
            this.WatchFileSystem();
            this.RenderAll();
        }

        public void Get(string currentDirectory)
        {
            this.RenderAll(currentDirectory);
        }

        private void WatchFileSystem()
        {
            var watcher = new FileSystemWatcher();

            watcher.Path = RootDirectory;

            watcher.NotifyFilter = NotifyFilters.LastAccess | NotifyFilters.LastWrite | NotifyFilters.FileName | NotifyFilters.DirectoryName;

            watcher.Changed += new FileSystemEventHandler(OnChanged);
            watcher.Created += new FileSystemEventHandler(OnChanged);
            watcher.Deleted += new FileSystemEventHandler(OnChanged);
            watcher.Renamed += new RenamedEventHandler(OnChanged);

            watcher.EnableRaisingEvents = true;
        }

        private void OnChanged (object source, FileSystemEventArgs e)
        {
            this.RenderAll();
        }

        private void RenderAll(string currentDirectory = RootDirectory)
        {
            var directoryInfo = new DirectoryInfo(currentDirectory);

            Clients.Caller.renderDirectories(directoryInfo.EnumerateDirectories());
            Clients.Caller.renderFiles(directoryInfo.EnumerateFiles());

            this.RenderParent(directoryInfo);
        }

        private void RenderParent(DirectoryInfo directoryInfo)
        {
            var path = directoryInfo.FullName;

            if (path == RootDirectory)
            {
                return;
            }

            Clients.Caller.renderParent(directoryInfo.Parent);
        }
    }
}