using Microsoft.AspNet.SignalR;
using System.Configuration;
using System.IO;

namespace MarkdownMagic.App.Hubs
{
    public class MainHub : Hub
    {
        private readonly string rootDirectory;

        public MainHub()
        {
            this.rootDirectory = ConfigurationManager.AppSettings["RootDirectory"];
        }

        public void Init()
        {
            this.WatchFileSystem();
            this.RenderAll();
        }

        public void Navigate(string currentDirectory)
        {
            this.RenderAll(currentDirectory);
        }

        public void Read(string filePath)
        {
            using (var streamReader = new StreamReader(filePath))
            {
                this.Clients.Caller.renderDetails(streamReader.ReadToEnd());
            }
        }

        private void WatchFileSystem()
        {
            var watcher = new FileSystemWatcher();

            watcher.Path = this.rootDirectory;

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

        private void RenderAll()
        {
            this.RenderAll(this.rootDirectory);
        }

        private void RenderAll(string currentDirectory)
        {
            var directoryInfo = new DirectoryInfo(currentDirectory);
            this.Clients.Caller.renderDirectories(directoryInfo.EnumerateDirectories(), this.ParentInfo(directoryInfo));
            this.Clients.Caller.renderFiles(directoryInfo.EnumerateFiles(), this.ParentInfo(directoryInfo));
        }

        private DirectoryInfo ParentInfo(DirectoryInfo directoryInfo)
        {
            return directoryInfo.FullName != this.rootDirectory ? directoryInfo.Parent : null;
        }
    }
}