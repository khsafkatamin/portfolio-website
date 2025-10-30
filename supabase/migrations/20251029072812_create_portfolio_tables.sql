/*
  # Portfolio Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key) - Unique identifier for each category
      - `name` (text, unique) - Category name (e.g., "Computer Vision", "Generative AI")
      - `slug` (text, unique) - URL-friendly version of the name
      - `created_at` (timestamptz) - Timestamp of creation
    
    - `projects`
      - `id` (uuid, primary key) - Unique identifier for each project
      - `title` (text) - Project title
      - `description` (text) - Brief description for card view
      - `detailed_description` (text) - Full description for modal view
      - `image_url` (text) - Project thumbnail image URL
      - `demo_url` (text, nullable) - Live demo URL if available
      - `github_url` (text, nullable) - GitHub repository URL if available
      - `order_index` (integer) - For custom ordering of projects
      - `created_at` (timestamptz) - Timestamp of creation
    
    - `project_categories`
      - `project_id` (uuid, foreign key) - References projects table
      - `category_id` (uuid, foreign key) - References categories table
      - `created_at` (timestamptz) - Timestamp of creation
      - Primary key: (project_id, category_id)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (portfolio is public)
    - No write access from client (managed through admin panel or direct DB access)

  3. Indexes
    - Index on project_categories for efficient filtering
    - Index on projects.order_index for sorting
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  detailed_description text NOT NULL,
  image_url text NOT NULL,
  demo_url text,
  github_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create project_categories junction table
CREATE TABLE IF NOT EXISTS project_categories (
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (project_id, category_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_project_categories_project_id ON project_categories(project_id);
CREATE INDEX IF NOT EXISTS idx_project_categories_category_id ON project_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_order_index ON projects(order_index);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Projects are publicly readable"
  ON projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Project categories are publicly readable"
  ON project_categories FOR SELECT
  TO anon
  USING (true);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES
  ('Computer Vision', 'computer-vision'),
  ('Generative AI', 'generative-ai'),
  ('Automated Driving', 'automated-driving'),
  ('Machine Learning', 'machine-learning'),
  ('Web Development', 'web-development'),
  ('Research', 'research'),
  ('AI Agent', 'ai-agent')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, detailed_description, image_url, demo_url, github_url, order_index) VALUES
  ('Dissertation',
  'Development of a Framework for Harmonization, Enrichment and Classification of Behavioral Data', 
  'To ensure Automated Driving Systems (ADS) are safe and intelligent, they must first understand complex human driving behavior. This understanding comes from trajectory datasets, which track vehicle and road user movements.

  However, these raw datasets present two major problems: they are heterogeneous, meaning data from different sources (for example, different cities or collection methods) have incompatible structures, formats, and semantics; and they lack context, as most datasets contain only motion data while omitting vital information such as road geometry, traffic signal status, or weather conditions, which makes analyzing this messy, incomplete data complex and extremely time-consuming.

  This dissertation presents a modular framework designed to automatically process, standardize, and enrich diverse trajectory datasets, providing a clean, consistent, and context‑rich foundation for behavioral analysis. The core of the framework centers on two functions: data harmonization, which ingests heterogeneous sources and transforms them into a unified standardized structure, and automated enrichment, which appends critical environmental and situational context. All processed data are stored efficiently in MongoDB to enable scalable access and complex querying.

  The framework''s automated enrichment pipelines add multiple layers of critical information:

  • ➤ Junction Detection & Classification: 
  Automatically identifies and segments road junctions using OpenStreetMap (OSM) data, classifying each one by type.

  • ➤ Trajectory & Maneuver Analysis:
  Analyzes vehicle paths through junctions to classify driver maneuvers (e.g., left turn, right turn, straight, U-turn). Detects and categorizes vehicle-to-vehicle (V2V) interactions, such as merging, full oncoming, or diagonal turns.

  • ➤ Weather: 
  Automatically fetches and integrates historical weather data (e.g., precipitation, temperature, wind velocity) from nearby weather stations using weather API.
      
  • ➤ HD Maps: 
  Integrates high-definition Lanelet2 maps to provide precise, lane-level road geometry for highly detailed analysis.

  The framework''s effectiveness was validated using three distinct, real-world trajectory datasets.
  • Successfully processed and harmonized all three datasets, ensuring data integrity.
  • Automatically detected and categorized vehicle data across 10 major urban intersections.
  • Accurately classified approximately 43,000 individual driver maneuvers.
  • Detected and classified roughly 300,000 V2V interactions.
  • Final Outcome: Enabled the direct generation of complete, context-aware traffic scenes, including digital maps and environmental data, ready for ADS testing and behavior modeling.',
    '/tumdot.png',
    null, 
    null, 
    1 
  ),
  ('Traffic Light Detection System',
  'A Comparative Study on YOLOv5-Based Traffic Light Recognition for Automated Driving',
  'Course: Automated and Connected Driving Challenges – Research Project (ACDC-RP), Institute of Automotive Engineering (ika), RWTH Aachen University

  Objective:
  Accurate recognition of traffic light states is essential for safe automated driving in urban environments. Although V2X communication can transmit signal states when the required infrastructure exists, many intersections still lack such systems. As a fallback—or in regions where V2X is not available—a dedicated perception function capable of detecting traffic lights and their current states from camera images becomes indispensable. Moreover, traffic light appearance and context vary significantly between geographic regions, so robustness to cross-regional variation is a core challenge.

  The objective of this project was to build a deep learning–based traffic light detection system for automated driving applications. A YOLOv5 model was selected to achieve accurate and real-time detection performance. To further evaluate the model’s robustness across different geographic conditions, training and testing were performed using two geographically distinct datasets: the Bosch Small Traffic Light Dataset (BSTLD, collected in the United States) and the DriveU Traffic Light Dataset (DTLD, collected in Germany).

  Approach:
  • Designed and implemented a complete detection pipeline using YOLOv5s (Ultralytics, PyTorch).
  • Unified and harmonized the DriveU Traffic Light Dataset (DTLD) and Bosch Small Traffic Light Dataset (BSTLD) through custom annotation converters and label mapping.
  • Conducted cross-dataset training and evaluation to analyze generalization and dataset-driven performance variations.

  Key Results:
  • Models trained and tested on the same dataset achieved strong detection performance (Weighted mAP ≈ 0.84–0.86).  
  • When tested cross-dataset for BSTLD dataset, performance dropped to around 0.49–0.50 , highlighting BSTLD’s limited contextual diversity.  
  • In contrast, models trained on DTLD generalized significantly better to BSTLD, demonstrating DTLD’s richer variety of traffic light appearances and contexts. 
  • The model achieved real-time inference at around 57–59 FPS on an RTX laptop GPU.
  
  Tools & Frameworks: Python, PyTorch, Ultralytics YOLOv5, OpenCV',
  'traffic-light-detection-gemini.png',
  -- 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
  NULL,
  'https://github.com/ika-rwth-aachen/acdc-research-projects/tree/main/reports/05-Traffic-Light-Detection/2023-09_Amin',
  2),

  ('AInfineon - an AI Assistant',
  'Customer Experience Enhancement with Public Data and Generative AI',
  'This project was developed as part of the EESTECH Challenge Aachen at Generative AI Hackathon, focused on enhancing customer experience using Generative AI and public data from Infineon’s GitHub repositories. The challenge addressed the problem of inconsistent and delayed responses to technical issues, which often led to reduced user satisfaction.

  To solve this, a feedback generation system powered by a large language model was developed. The system automatically generated replies to GitHub issues from three distinct AI personas, each representing a different communication tone — technical, balanced, and empathetic — allowing users to receive responses aligned with their preferred interaction style.

  The generated responses were integrated into an interactive chatbot interface built with a Python backend and a Node.js web interface, enabling dynamic user engagement and response comparison.

  The solution demonstrated the potential of generative AI in improving public support systems and maintaining consistent communication quality across open-source communities.

  Awarded 2nd Place among all participating teams in the EESTECH Challenge Aachen.',
  '/UI.png',
  null,
  'https://github.com/mechgguy/eestech-hackathon',
  3
  ),
  (
    'Portfolio Website',
    'Modern, responsive portfolio built with React and Supabase',
    'Designed and developed a professional portfolio website featuring dynamic content management through Supabase. Implements smooth animations, dark theme, and an intuitive project filtering system. Built with React, TypeScript, and Tailwind CSS for optimal performance and maintainability.',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://example.com/demo',
    'https://github.com',
    4
  )
ON CONFLICT DO NOTHING;

-- Link projects to categories
INSERT INTO project_categories (project_id, category_id)
SELECT p.id, c.id FROM projects p, categories c
WHERE 
  (p.title = 'Dissertation' AND c.slug IN ('research', 'automated-driving'))
  OR (p.title = 'Traffic Light Detection System' AND c.slug IN ('computer-vision', 'automated-driving', 'machine-learning', 'research'))
  OR (p.title = 'AInfineon - an AI Assistant' AND c.slug IN ('generative-ai', 'ai-agent', 'machine-learning'))
  OR (p.title = 'Portfolio Website' AND c.slug IN ('web-development'))
ON CONFLICT DO NOTHING;