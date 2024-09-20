    import React, { useState, useCallback } from 'react';
    import './index.css';
    import {
    Page,
    Card,
    IndexTable,
    ChoiceList,
    IndexFilters,
    LegacyCard,
    useSetIndexFiltersMode,
    useIndexResourceState,
    TextField,
    Button, Box, Text, Pagination, Icon,
} from '@shopify/polaris';
    import {ChevronLeftIcon, ChevronRightIcon} from "@shopify/polaris-icons";

    function Customer() {
        const [sortSelected, setSortSelected] = useState(["product asc"]);
        const { mode, setMode } = useSetIndexFiltersMode();

        const [location, setLocation] = useState(undefined);
        const [dynamicLocations, setDynamicLocations] = useState([""]);
        const [newLocation, setNewLocation] = useState("");
        const [customerName, setCustomerName] = useState("");
        const [email, setEmail] = useState("");
        const [contactNo, setContactNo] = useState("");
        const [queryValue, setQueryValue] = useState("");

        const handleLocationChange = useCallback((value) => setLocation(value), []);
        const handleNewLocationChange = useCallback((value) => setNewLocation(value), []);
        const handleCustomerNameChange = useCallback((value) => setCustomerName(value), []);
        const handleEmailChange = useCallback((value) => setEmail(value), []);
        const handleContactNoChange = useCallback((value) => setContactNo(value), []);
        const handleFiltersQueryChange = useCallback((value) => setQueryValue(value), []);
        const handleLocationRemove = useCallback(() => setLocation(undefined), []);
        const handleCustomerNameRemove = useCallback(() => setCustomerName(""), []);
        const handleEmailRemove = useCallback(() => setEmail(""), []);
        const handleContactNoRemove = useCallback(() => setContactNo(""), []);
        const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
        const handleFiltersClearAll = useCallback(() => {
            handleLocationRemove();
            handleCustomerNameRemove();
            handleEmailRemove();
            handleContactNoRemove();
            handleQueryValueRemove();
        }, [handleLocationRemove, handleCustomerNameRemove, handleEmailRemove, handleContactNoRemove, handleQueryValueRemove]);

        const handleAddLocation = () => {
            if (newLocation && !dynamicLocations.includes(newLocation)) {
                setDynamicLocations((prev) => [...prev, newLocation]);
                setNewLocation("");
            }
        };

        const filters = [
            {
                key: "location",
                label: "Location",
                filter: (
                    <div>
                        <ChoiceList
                            title="Location"
                            titleHidden
                            choices={dynamicLocations.map(loc => ({ label: loc, value: loc }))}
                            selected={location || []}
                            onChange={handleLocationChange}
                            allowMultiple
                        />
                        <TextField
                            label="Add New Location"
                            value={newLocation}
                            onChange={handleNewLocationChange}
                            autoComplete="off"
                        />
                        <Button onClick={handleAddLocation}>Add</Button>
                    </div>
                ),
                shortcut: true,
            },
            {
                key: "customerName",
                label: "Customer Name",
                filter: (
                    <TextField
                        label="Customer Name"
                        value={customerName}
                        onChange={handleCustomerNameChange}
                        autoComplete="off"
                    />
                ),
            },
            {
                key: "email",
                label: "Email",
                filter: (
                    <TextField
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="off"
                    />
                ),
            },
            {
                key: "contactNo",
                label: "Contact Number",
                filter: (
                    <TextField
                        label="Contact Number"
                        value={contactNo}
                        onChange={handleContactNoChange}
                        autoComplete="off"
                    />
                ),
            },
        ];
        const appliedFilters = [];

        if (location && location.length > 0) {
            appliedFilters.push({
                key: "location",
                label: location.map((val) => `Location: ${val}`).join(", "),
                onRemove: handleLocationRemove,
            });
        }
        if (customerName) {
            appliedFilters.push({
                key: "customerName",
                label: `Customer Name: ${customerName}`,
                onRemove: handleCustomerNameRemove,
            });
        }
        if (email) {
            appliedFilters.push({
                key: "email",
                label: `Email: ${email}`,
                onRemove: handleEmailRemove,
            });
        }
        if (contactNo) {
            appliedFilters.push({
                key: "contactNo",
                label: `Contact Number: ${contactNo}`,
                onRemove: handleContactNoRemove,
            });
        }

        const products = [
            {
                id: '001',
                customer: "Southville Sol",
                email: "southville@gmail.com",
                contactphone: "+923000000000",
                location: "Lahore, Pakistan",
                order: "12",
                amountspend: '12000$',
            },
            {
                id: '002',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Islamabad, Pakistan",
                order: "15",
                amountspend: '15000$',
            },
            {
                id: '003',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Karachi, Pakistan",
                order: "15",
                amountspend: '15000$',
            },
            {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }, {
                id: '004',
                customer: "Northern Lights",
                email: "northernlights@gmail.com",
                contactphone: "+923111111111",
                location: "Peshawar, Pakistan",
                order: "15",
                amountspend: '15000$',
            }
        ];

        const filteredProducts = products.filter(product => {
            const matchesLocation = !location || location.length === 0 || location.includes(product.location.split(",")[0]);
            const matchesCustomerName = !customerName || product.customer.toLowerCase().includes(customerName.toLowerCase());
            const matchesEmail = !email || product.email.toLowerCase().includes(email.toLowerCase());
            const matchesContactNo = !contactNo || product.contactphone.includes(contactNo);

            return matchesLocation && matchesCustomerName && matchesEmail && matchesContactNo;
        });

        const { selectedResources, handleSelectionChange } = useIndexResourceState(filteredProducts);

        const resourceName = {
            singular: "Customer",
            plural: "Customers",
        };

        const rowMarkup = filteredProducts.map(({ id, customer, email, contactphone, location, order, amountspend }, index) => (
            <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
                <IndexTable.Cell>{customer}</IndexTable.Cell>
                <IndexTable.Cell>{email}</IndexTable.Cell>
                <IndexTable.Cell>{contactphone}</IndexTable.Cell>
                <IndexTable.Cell>{location}</IndexTable.Cell>
                <IndexTable.Cell>{order}</IndexTable.Cell>
                <IndexTable.Cell>{amountspend}</IndexTable.Cell>
            </IndexTable.Row>
        ));

        return (


            <Box padding={"0"}>


                <LegacyCard>
                    <IndexFilters
                        tabs={[]}
                        filters={filters}
                        appliedFilters={appliedFilters}
                        queryValue={queryValue}
                        onQueryChange={handleFiltersQueryChange}
                        onQueryClear={handleQueryValueRemove}
                        onClearAll={handleFiltersClearAll}
                        sortOptions={[
                            { label: "Customer", value: "customer asc", directionLabel: "Ascending" },
                            { label: "Customer", value: "customer desc", directionLabel: "Descending" },
                        ]}
                        sortSelected={sortSelected}
                        onSortChange={setSortSelected}
                        mode={mode}
                        setMode={setMode}
                    />

                    <Card>
                        <IndexTable
                            resourceName={resourceName}
                            itemCount={filteredProducts.length}
                            selectedItemsCount={selectedResources.length}
                            onSelectionChange={handleSelectionChange}
                            headings={[
                                {title: "Customer"},
                                {title: "Email"},
                                {title: "Phone Number"},
                                {title: "Location"},
                                {title: "Orders"},
                                {title: "Amount Spend"},
                            ]}

                        >

                            {rowMarkup}
                        </IndexTable>
                        <div style={{marginTop:'10px',display:'flex',justifyContent:'flex-end'}}>
                            <button style={{border:'none',background:'transparent',cursor:'pointer'}}>
                                <Icon
                                    source={ChevronLeftIcon}
                                    tone="base"
                                />
                            </button>
                            <button style={{border:'none',background:'transparent',cursor:'pointer'}}>
                                <Icon
                                    source={ChevronRightIcon}
                                    tone="base"
                                />
                            </button>
                        </div>

                    </Card>
                </LegacyCard>


            </Box>


        );
    }

    export default Customer;
