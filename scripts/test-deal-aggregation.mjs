// Test script for Deal Aggregation System
// filepath: c:\Users\jgram\git\Nexus\scripts\test-deal-aggregation.mjs

import { DealAggregatorService } from '../lib/services/deal-aggregator.service.js';

async function testDealAggregation() {
  console.log('🚀 Testing Deal Aggregation System...');

  try {
    console.log('📥 Starting deal aggregation...');
    const results = await DealAggregatorService.aggregateAllDeals();

    console.log('✅ Deal aggregation completed!');
    console.log(`📊 Results:`, {
      totalProcessed: results.totalProcessed,
      created: results.created,
      updated: results.updated,
      errors: results.errors.length,
      sources: results.sources
    });

    if (results.errors.length > 0) {
      console.log('❌ Errors encountered:');
      results.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }

    console.log('🎉 Test completed successfully!');
  } catch (error) {
    console.error('💥 Test failed:', error.message);
    console.error(error.stack);
  }
}

// Run the test
testDealAggregation();
