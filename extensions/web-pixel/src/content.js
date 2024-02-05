const endpoints = require('./config/endpoints');
const DCSMap = require('./config/DCSMap');

async function getDynamicContent(octyCustomerID) {
  try {
    const requestBody = JSON.stringify({
      octyCustomerId: octyCustomerID.replace(/^"(.*)"$/, '$1'),
      sections: DCSMap,
    });

    const response = await fetch(endpoints.getContentURI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    if (response.status === 200) {
      // TODO: check if the response body matches the expected schema
      const text = await response.text();
      return [true, text];
    } else {
      console.log('Failed to get dynamic content!');
      return [false, null];
    }
  } catch (error) {
    console.warn('Failed to get dynamic content!', error);
    return [false, null];
  }
}

function loadDefaultContent() {
  const sections = document.querySelectorAll('[data-octy-content]');
  if (sections != null) {
    for (const section of sections) {
      const sectionID = section.getAttribute('data-octy-content');
      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
      let defaultValue;
      for (const key in DCSMap) {
        if (DCSMap[key].section_id === sectionID) {
          defaultValue = DCSMap[key].default_value;
          break;
        }
      }
      section.innerHTML += defaultValue;
    }
    console.log('Default content loaded!');
  } else {
    console.log('No dynamic sections found!');
  }
}

function loadDynamicContent(dynamicSections) {
  const sections = document.querySelectorAll('[data-octy-content]');
  if (sections != null) {
    for (const section of sections) {
      const sectionID = section.getAttribute('data-octy-content');
      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
      let content;
      for (const dynamicSection of dynamicSections) {
        if (dynamicSection.sectionID === sectionID) {
          content = dynamicSection.content;
          break;
        }
      } 
      section.innerHTML += content;
    }
  }
}

module.exports = {
  getDynamicContent,
  loadDefaultContent,
  loadDynamicContent,
};
