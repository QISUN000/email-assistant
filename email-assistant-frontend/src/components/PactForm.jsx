import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function PactForm() {
  const [formData, setFormData] = useState({
    purpose: '',
    audience: '',
    context: '',
    tone: '',
    keyPoints: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');

  const copyToClipboard = async () => {
    try {
      // Remove HTML line breaks before copying
      const plainText = generatedEmail.replace(/<br>/g, '\n');
      await navigator.clipboard.writeText(plainText);
      setCopySuccess('Copied!');
      // Reset success message after 2 seconds
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data:', formData);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch from backend')
      }
      const data = await response.json();
      console.log('Received email:', data.email);
      // setGeneratedEmail(data.email);
      if (data.email) {
        setGeneratedEmail(data.email.replace(/\n/g, '<br>')); // Convert newlines to HTML breaks
      }
    } catch (err) {
      setError('Failed to generate email');
    } finally {
      setIsLoading(false);
    }
  };
  const insertToGmail = async () => {
    if (!generatedEmail) return;
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.includes('mail.google.com')) {
        setError('Please open Gmail compose window first');
        return;
      }

      await chrome.tabs.sendMessage(tab.id, {
        action: "insertEmail",
        email: generatedEmail
      });

      // Close popup after successful insertion
      window.close();
    } catch (err) {
      setError('Failed to insert email into Gmail');
    }
  };

  return (
    <Container className="p-3" style={{ width: '500px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Purpose "What do you want to achieve with this email?" </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={`I need approval for...\nI want to update the team about...\nI'm trying to get information about...`}
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>audience "Tell me about who you're writing to and your relationship with them." </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={`First time contacting manager's boss...\nRegular client but never met in person...\nNew team member introduction...`}
            value={formData.audience}
            onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Context "What's the background situation?" </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={`Following up on yesterday's meeting...\nUrgent issue with...\nPart of ongoing project where...`}
            value={formData.context}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tone "How would you like this email to come across?" </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder={`Very formal for executives...\nFriendly but professional for team updates...`}
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Key Points "Anything specific that absolutely needs to be included?" </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={`Project deadline is March 1st...\nBudget is $10k...\nNeed response by Friday...`}
            value={formData.keyPoints}
            onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
          />
        </Form.Group>


        <Button
          type="submit"
          variant="primary"
          className="w-100 mb-2"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Email'}
        </Button>

        {generatedEmail && (
          <div className="d-grid gap-2">
            <Button
              variant="success"
              className="mt-2"
              onClick={insertToGmail}
            >
              Insert to Gmail
            </Button>
            <Button
              variant="secondary"
              className="mt-2"
              onClick={copyToClipboard}
            >
              {copySuccess || 'Copy to Clipboard'}
            </Button>
          </div>
        )}

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {copySuccess && <Alert variant="success" className="mt-3">{copySuccess}</Alert>}

        {generatedEmail && (
          <div className="mt-3">
            <h6>Generated Email:</h6>
            <div
              className="border p-3 rounded"
              dangerouslySetInnerHTML={{ __html: generatedEmail }}
            />
          </div>
        )}
      </Form>
    </Container>
  );
}

export default PactForm;