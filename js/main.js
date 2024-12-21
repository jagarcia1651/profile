document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch and render the resume content
        const response = await fetch('resume.md');
        const markdown = await response.text();
        
        // Simple markdown to HTML converter
        const html = markdownToHtml(markdown);
        document.getElementById('resume-content').innerHTML = html;
    } catch (error) {
        console.error('Error loading resume:', error);
        document.getElementById('resume-content').innerHTML = '<p>Error loading resume content.</p>';
    }
});

function markdownToHtml(markdown) {
    // This is a basic markdown converter. You might want to use a library like marked.js for production
    return markdown
        // Headers
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Lists
        .replace(/^\- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800">$1</a>')
        // Paragraphs
        .replace(/^\s*$/gm, '</p><p>')
        // Clean up empty paragraphs
        .replace(/<p><\/p>/g, '')
        // Wrap in paragraph tags
        .replace(/^(.+)$/gm, '<p>$1</p>');
} 