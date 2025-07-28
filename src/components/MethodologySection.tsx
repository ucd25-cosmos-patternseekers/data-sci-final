import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Code, Play, BarChart3, Users, Clock, Smartphone } from "lucide-react";

const MethodologySection = () => {
  const [activeCode, setActiveCode] = useState('data-collection');

  const codeExamples = {
    'data-collection': `# Data Collection Process
import pandas as pd
import numpy as np
from datetime import datetime

def collect_app_usage_data():
    """
    Collect user app usage patterns
    """
    usage_data = {
        'user_id': [],
        'app_name': [],
        'timestamp': [],
        'usage_duration': [],
        'previous_app': [],
        'time_of_day': [],
        'day_of_week': []
    }
    
    # Process raw usage logs
    for session in app_sessions:
        usage_data['user_id'].append(session.user_id)
        usage_data['app_name'].append(session.app_name)
        # ... processing logic
    
    return pd.DataFrame(usage_data)`,

    'feature-engineering': `# Feature Engineering
from sklearn.preprocessing import LabelEncoder, StandardScaler

def engineer_features(df):
    """
    Create predictive features from raw data
    """
    # Temporal features
    df['hour'] = df['timestamp'].dt.hour
    df['is_weekend'] = df['timestamp'].dt.weekday >= 5
    
    # Usage patterns
    df['apps_per_hour'] = df.groupby(['user_id', 'hour'])['app_name'].transform('count')
    df['avg_session_duration'] = df.groupby('user_id')['usage_duration'].transform('mean')
    
    # Sequential patterns
    df['app_sequence'] = df.groupby('user_id')['app_name'].shift(1)
    df['time_since_last_app'] = df['timestamp'].diff().dt.total_seconds()
    
    return df`,

    'model-training': `# Model Training
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

def train_prediction_model(X, y):
    """
    Train app prediction model
    """
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Random Forest model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    return model, accuracy`
  };

  return (
    <section id="methodology" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Our Methodology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive approach to understanding user behavior and predicting app usage patterns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Data Collection</CardTitle>
              <CardDescription>
                Gathered comprehensive user app usage data including timestamps, duration, and context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 10,000+ users tracked</li>
                <li>• 2M+ app usage sessions</li>
                <li>• 6 months of data</li>
                <li>• Privacy-compliant collection</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Feature Engineering</CardTitle>
              <CardDescription>
                Extracted meaningful patterns and behavioral indicators from raw usage data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Temporal patterns</li>
                <li>• Usage frequency metrics</li>
                <li>• Sequential app transitions</li>
                <li>• Context-aware features</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="data-card scroll-reveal">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Model Development</CardTitle>
              <CardDescription>
                Built and optimized machine learning models for accurate app usage prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Random Forest classifier</li>
                <li>• Cross-validation testing</li>
                <li>• Feature importance analysis</li>
                <li>• Real-time prediction</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="scroll-reveal">
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                Interactive Code Examples
              </CardTitle>
              <CardDescription>
                Explore our implementation with interactive code snippets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCode} onValueChange={setActiveCode} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="data-collection">Data Collection</TabsTrigger>
                  <TabsTrigger value="feature-engineering">Feature Engineering</TabsTrigger>
                  <TabsTrigger value="model-training">Model Training</TabsTrigger>
                </TabsList>
                
                {Object.entries(codeExamples).map(([key, code]) => (
                  <TabsContent key={key} value={key}>
                    <div className="code-block">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                          {key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Play className="w-4 h-4" />
                          Run Code
                        </Button>
                      </div>
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-muted-foreground">{code}</code>
                      </pre>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;