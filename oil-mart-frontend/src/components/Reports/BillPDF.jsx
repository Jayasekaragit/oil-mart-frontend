import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const BillPDF = ({ cart, moneyReceived, balance, cashierName, discountPercentage, discountedTotal }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 10,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: 'auto',
      marginTop: 5,
      fontSize: 12,
    },
    totalCell: {
      fontWeight: 'bold',
    },
  });

  return (
    <PDFViewer width="100%" height="500px">
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Bill Summary</Text>
          <Text style={styles.subtitle}>Cashier: {cashierName}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Quantity</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Price</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total Price</Text>
              </View>
            </View>
            {cart.map((product, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{product.product_name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{product.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Rs {product.sell_price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Rs {product.totalPrice.toFixed(2)}</Text>
                </View>
              </View>
            ))}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Total</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Rs {
                  cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0).toFixed(2)
                }</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Discount ({discountPercentage}%)</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Rs {
                  ((cart.reduce((acc, current) => acc + (current.totalPrice || 0), 0) * discountPercentage) / 100).toFixed(2)
                }</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Total After Discount</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Rs {discountedTotal.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Money Received</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Rs {moneyReceived}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Balance</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}>
                <Text style={[styles.tableCell, styles.totalCell]}>Rs {balance.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default BillPDF;
