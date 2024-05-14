import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12,
    },
    header: {
        fontSize: 16,
        marginBottom: 10,
    },
    table: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        padding: 5,
    },
    tableHeaderCell: {
        width: '25%',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 5,
    },
    tableCell: {
        width: '25%',
        textAlign: "center"
    },
});

const Pdf = ({ data, handleData }) => {
    return (
        <PDFDownloadLink onClick={() => setTimeout(() => {
            handleData([])
        }, 2000)} document={<InventoryReportDocument data={data} />} fileName="inventory_report.pdf">
            {({ loading }) => (loading ? 'Loading...' : 'Download Report')}
        </PDFDownloadLink>
    );
};

const InventoryReportDocument = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>Inventory Report</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderCell}>Item Name</Text>
                    <Text style={styles.tableHeaderCell}>Assignee</Text>
                    <Text style={styles.tableHeaderCell}>Assigner</Text>
                    <Text style={styles.tableHeaderCell}>Quantity</Text>
                    <Text style={styles.tableHeaderCell}>Date</Text>
                </View>
                {data.map((item) => (
                    <View style={styles.tableRow} key={item._id}>
                        <Text style={styles.tableCell}>{item.item.name}</Text>
                        <Text style={styles.tableCell}>{item.user.username}</Text>
                        <Text style={styles.tableCell}>{item.assigner.username}</Text>
                        <Text style={styles.tableCell}>{item.quantity}</Text>
                        <Text style={styles.tableCell}>{item.createdAt.slice(0, 10)}</Text>
                        {/* <Text style={styles.tableCell}>
                            {(item.quantity * item.item.price).toFixed(2)}
                        </Text> */}
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default Pdf;
